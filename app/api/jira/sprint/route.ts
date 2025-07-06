import { type NextRequest, NextResponse } from "next/server"

async function makeJiraRequest(url: string, auth: string, timeoutMs = 15000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    console.log(`Making request to: ${url}`)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Jira-Board-App/1.0",
        "Cache-Control": "no-cache",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    console.log(`Response status: ${response.status}`)

    return response
  } catch (error) {
    clearTimeout(timeoutId)
    console.error(`Request failed for ${url}:`, error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { domain, email, apiToken, boardId } = await request.json()

    console.log(`Sprint API called with boardId: ${boardId}`)

    if (!domain || !email || !apiToken || !boardId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate boardId is numeric
    if (isNaN(Number(boardId))) {
      return NextResponse.json({ error: `Invalid board ID: ${boardId}` }, { status: 400 })
    }

    // Clean and validate domain
    let cleanDomain = domain.trim().replace(/^https?:\/\//, "")
    if (!cleanDomain.includes(".atlassian.net")) {
      cleanDomain = `${cleanDomain}.atlassian.net`
    }

    console.log(`Using domain: ${cleanDomain}`)

    const auth = Buffer.from(`${email}:${apiToken}`).toString("base64")

    // Test basic connectivity first
    try {
      const testUrl = `https://${cleanDomain}/rest/api/3/myself`
      const testResponse = await makeJiraRequest(testUrl, auth, 10000)

      if (!testResponse.ok) {
        const testError = await testResponse.text()
        return NextResponse.json({ error: `Authentication failed: ${testError}` }, { status: testResponse.status })
      }

      console.log("Authentication test passed")
    } catch (testError) {
      console.error("Authentication test failed:", testError)
      return NextResponse.json({ error: `Connection test failed: ${testError.message}` }, { status: 500 })
    }

    // Try different approaches to get sprint data
    let sprintData = null
    let issuesData = []
    const errorMessages = []

    // Approach 1: Try to get active sprints
    try {
      console.log("Attempting to fetch active sprints...")
      const activeSprintsUrl = `https://${cleanDomain}/rest/agile/1.0/board/${boardId}/sprint?state=active`
      const activeSprintsResponse = await makeJiraRequest(activeSprintsUrl, auth)

      if (activeSprintsResponse.ok) {
        const activeSprintsData = await activeSprintsResponse.json()
        console.log(`Found ${activeSprintsData.values?.length || 0} active sprints`)

        if (activeSprintsData.values && activeSprintsData.values.length > 0) {
          sprintData = activeSprintsData.values[0]
          console.log(`Using active sprint: ${sprintData.name}`)
        }
      } else {
        const errorText = await activeSprintsResponse.text()
        errorMessages.push(`Active sprints: ${errorText}`)
      }
    } catch (error) {
      console.error("Failed to fetch active sprints:", error)
      errorMessages.push(`Active sprints: ${error.message}`)
    }

    // Approach 2: If no active sprint, try all sprints
    if (!sprintData) {
      try {
        console.log("Attempting to fetch all sprints...")
        const allSprintsUrl = `https://${cleanDomain}/rest/agile/1.0/board/${boardId}/sprint`
        const allSprintsResponse = await makeJiraRequest(allSprintsUrl, auth)

        if (allSprintsResponse.ok) {
          const allSprintsData = await allSprintsResponse.json()
          console.log(`Found ${allSprintsData.values?.length || 0} total sprints`)

          if (allSprintsData.values && allSprintsData.values.length > 0) {
            // Find the most recent sprint
            const sortedSprints = allSprintsData.values.sort((a: any, b: any) => {
              const dateA = new Date(a.startDate || a.createdDate || 0)
              const dateB = new Date(b.startDate || b.createdDate || 0)
              return dateB.getTime() - dateA.getTime()
            })

            sprintData = sortedSprints[0]
            console.log(`Using most recent sprint: ${sprintData.name} (${sprintData.state})`)
          }
        } else {
          const errorText = await allSprintsResponse.text()
          errorMessages.push(`All sprints: ${errorText}`)
        }
      } catch (error) {
        console.error("Failed to fetch all sprints:", error)
        errorMessages.push(`All sprints: ${error.message}`)
      }
    }

    // Approach 3: Get issues (try sprint-specific first, then board issues)
    if (sprintData) {
      try {
        console.log(`Attempting to fetch issues for sprint ${sprintData.id}...`)
        const sprintIssuesUrl = `https://${cleanDomain}/rest/agile/1.0/sprint/${sprintData.id}/issue`
        const sprintIssuesResponse = await makeJiraRequest(sprintIssuesUrl, auth)

        if (sprintIssuesResponse.ok) {
          const sprintIssuesData = await sprintIssuesResponse.json()
          issuesData = sprintIssuesData.issues || []
          console.log(`Found ${issuesData.length} issues in sprint`)
        } else {
          const errorText = await sprintIssuesResponse.text()
          errorMessages.push(`Sprint issues: ${errorText}`)
        }
      } catch (error) {
        console.error("Failed to fetch sprint issues:", error)
        errorMessages.push(`Sprint issues: ${error.message}`)
      }
    }

    // Approach 4: Fallback to board issues if sprint issues failed
    if (issuesData.length === 0) {
      try {
        console.log("Attempting to fetch board issues as fallback...")
        const boardIssuesUrl = `https://${cleanDomain}/rest/agile/1.0/board/${boardId}/issue?maxResults=50`
        const boardIssuesResponse = await makeJiraRequest(boardIssuesUrl, auth)

        if (boardIssuesResponse.ok) {
          const boardIssuesData = await boardIssuesResponse.json()
          issuesData = boardIssuesData.issues || []
          console.log(`Found ${issuesData.length} board issues as fallback`)
        } else {
          const errorText = await boardIssuesResponse.text()
          errorMessages.push(`Board issues: ${errorText}`)
        }
      } catch (error) {
        console.error("Failed to fetch board issues:", error)
        errorMessages.push(`Board issues: ${error.message}`)
      }
    }

    // Return results or error
    if (sprintData || issuesData.length > 0) {
      return NextResponse.json({
        sprint: sprintData,
        issues: issuesData,
        fallback: !sprintData,
        warnings: errorMessages.length > 0 ? errorMessages : undefined,
      })
    } else {
      return NextResponse.json(
        {
          error: `Failed to fetch any data for board ${boardId}. Errors: ${errorMessages.join("; ")}`,
          details: errorMessages,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Server error in sprint route:", error)
    return NextResponse.json(
      {
        error: `Server error: ${error.message || "Unknown error occurred"}`,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

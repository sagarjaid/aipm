import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { domain, email, apiToken } = await request.json()

    if (!domain || !email || !apiToken) {
      return NextResponse.json({ error: "Missing required fields: domain, email, or apiToken" }, { status: 400 })
    }

    // Clean and validate domain
    let cleanDomain = domain.trim()

    // Remove protocol if present
    cleanDomain = cleanDomain.replace(/^https?:\/\//, "")

    // Ensure domain ends with .atlassian.net if not already present
    if (!cleanDomain.includes(".atlassian.net")) {
      cleanDomain = `${cleanDomain}.atlassian.net`
    }

    // Create the authorization header
    const auth = Buffer.from(`${email}:${apiToken}`).toString("base64")

    // Construct the Jira URL
    const jiraUrl = `https://${cleanDomain}/rest/agile/1.0/board`

    console.log(`Attempting to fetch from: ${jiraUrl}`)

    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const response = await fetch(jiraUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Jira-Board-List-App/1.0",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Jira API Error:", response.status, errorText)

        if (response.status === 401) {
          return NextResponse.json(
            { error: "Authentication failed. Please check your email and API token." },
            { status: 401 },
          )
        } else if (response.status === 403) {
          return NextResponse.json({ error: "Access denied. Please check your permissions." }, { status: 403 })
        } else if (response.status === 404) {
          return NextResponse.json(
            { error: `Jira instance not found. Please verify your domain: ${cleanDomain}` },
            { status: 404 },
          )
        } else {
          return NextResponse.json(
            { error: `Jira API error (${response.status}): ${errorText || "Unknown error"}` },
            { status: response.status },
          )
        }
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (fetchError) {
      clearTimeout(timeoutId)

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout. Please check your internet connection and try again." },
          { status: 408 },
        )
      }

      console.error("Fetch error:", fetchError)

      // Handle different types of network errors
      if (fetchError.code === "ENOTFOUND" || fetchError.message.includes("ENOTFOUND")) {
        return NextResponse.json(
          { error: `Cannot resolve domain: ${cleanDomain}. Please check your Jira domain.` },
          { status: 400 },
        )
      }

      if (fetchError.code === "ECONNREFUSED" || fetchError.message.includes("ECONNREFUSED")) {
        return NextResponse.json(
          { error: `Connection refused to ${cleanDomain}. Please check your domain and network connection.` },
          { status: 400 },
        )
      }

      throw fetchError // Re-throw if it's not a network error we can handle
    }
  } catch (error) {
    console.error("Server error:", error)

    // Provide more specific error messages
    if (error.message.includes("JSON")) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    return NextResponse.json({ error: `Server error: ${error.message || "Unknown error occurred"}` }, { status: 500 })
  }
}

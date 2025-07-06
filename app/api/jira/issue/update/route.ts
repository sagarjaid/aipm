import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { domain, email, apiToken, issueKey, fields } = await request.json()

    if (!domain || !email || !apiToken || !issueKey || !fields) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Clean domain
    let cleanDomain = domain.trim().replace(/^https?:\/\//, "")
    if (!cleanDomain.includes(".atlassian.net")) {
      cleanDomain = `${cleanDomain}.atlassian.net`
    }

    const auth = Buffer.from(`${email}:${apiToken}`).toString("base64")
    const updateUrl = `https://${cleanDomain}/rest/api/3/issue/${issueKey}`

    console.log(`Updating issue: ${issueKey}`, fields)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Jira-Board-App/1.0",
        },
        body: JSON.stringify({ fields }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Failed to update issue: ${response.status} - ${errorText}`)
        return NextResponse.json({ error: `Failed to update issue: ${errorText}` }, { status: response.status })
      }

      return NextResponse.json({ success: true, message: "Issue updated successfully" })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("Issue update error:", fetchError)

      if (fetchError.name === "AbortError") {
        return NextResponse.json({ error: "Request timeout while updating issue" }, { status: 408 })
      }

      throw fetchError
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: `Server error: ${error.message || "Unknown error occurred"}` }, { status: 500 })
  }
}

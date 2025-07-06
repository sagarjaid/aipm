import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { domain, email, apiToken } = await request.json()

    if (!domain || !email || !apiToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Clean domain
    let cleanDomain = domain.trim().replace(/^https?:\/\//, "")
    if (!cleanDomain.includes(".atlassian.net")) {
      cleanDomain = `${cleanDomain}.atlassian.net`
    }

    const auth = Buffer.from(`${email}:${apiToken}`).toString("base64")
    const prioritiesUrl = `https://${cleanDomain}/rest/api/3/priority`

    console.log("Getting priorities from Jira...")

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
      const response = await fetch(prioritiesUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
          "User-Agent": "Jira-Board-App/1.0",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Failed to get priorities: ${response.status} - ${errorText}`)
        return NextResponse.json({ error: `Failed to get priorities: ${errorText}` }, { status: response.status })
      }

      const prioritiesData = await response.json()
      return NextResponse.json(prioritiesData || [])
    } catch (fetchError) {
      clearTimeout(timeoutId)

      if (fetchError.name === "AbortError") {
        return NextResponse.json({ error: "Request timeout while fetching priorities" }, { status: 408 })
      }

      throw fetchError
    }
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: `Server error: ${error.message || "Unknown error occurred"}` }, { status: 500 })
  }
}

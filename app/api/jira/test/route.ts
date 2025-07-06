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

    // Test with a simple API call first
    const testUrl = `https://${cleanDomain}/rest/api/3/myself`

    console.log(`Testing connection to: ${testUrl}`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch(testUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const userData = await response.json()
        return NextResponse.json({
          success: true,
          message: "Connection successful",
          user: userData.displayName || userData.emailAddress,
          domain: cleanDomain,
        })
      } else {
        const errorText = await response.text()
        return NextResponse.json(
          {
            success: false,
            error: `Authentication failed (${response.status}): ${errorText}`,
            domain: cleanDomain,
          },
          { status: response.status },
        )
      }
    } catch (fetchError) {
      clearTimeout(timeoutId)

      return NextResponse.json(
        {
          success: false,
          error: `Connection failed: ${fetchError.message}`,
          domain: cleanDomain,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Server error: ${error.message}`,
      },
      { status: 500 },
    )
  }
}

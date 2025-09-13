import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { domain, email, apiToken, issueKey } = await request.json();

    if (!domain || !email || !apiToken || !issueKey) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Clean domain
    let cleanDomain = domain.trim().replace(/^https?:\/\//, "");
    if (!cleanDomain.includes(".atlassian.net")) {
      cleanDomain = `${cleanDomain}.atlassian.net`;
    }

    const auth = Buffer.from(`${email}:${apiToken}`).toString("base64");
    const issueUrl = `https://${cleanDomain}/rest/api/3/issue/${issueKey}`;

    console.log(`Fetching issue: ${issueKey}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(issueUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
          "User-Agent": "Jira-Board-App/1.0",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to fetch issue: ${response.status} - ${errorText}`,
        );
        return NextResponse.json(
          { error: `Failed to fetch issue: ${errorText}` },
          { status: response.status },
        );
      }

      const issueData = await response.json();
      return NextResponse.json(issueData);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error("Issue fetch error:", fetchError);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout while fetching issue" },
          { status: 408 },
        );
      }

      throw fetchError;
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: `Server error: ${error.message || "Unknown error occurred"}` },
      { status: 500 },
    );
  }
}

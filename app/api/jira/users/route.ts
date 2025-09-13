import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { domain, email, apiToken, projectKey, issueKey } =
      await request.json();

    if (!domain || !email || !apiToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!projectKey && !issueKey) {
      return NextResponse.json(
        { error: "Either projectKey or issueKey must be provided" },
        { status: 400 },
      );
    }

    // Clean domain
    let cleanDomain = domain.trim().replace(/^https?:\/\//, "");
    if (!cleanDomain.includes(".atlassian.net")) {
      cleanDomain = `${cleanDomain}.atlassian.net`;
    }

    const auth = Buffer.from(`${email}:${apiToken}`).toString("base64");

    // Get assignable users - prefer issue-specific if issueKey is provided
    let usersUrl = `https://${cleanDomain}/rest/api/3/user/assignable/search`;

    if (issueKey) {
      usersUrl += `?issueKey=${issueKey}`;
      console.log(`Getting assignable users for issue: ${issueKey}`);
    } else if (projectKey) {
      usersUrl += `?project=${projectKey}`;
      console.log(`Getting assignable users for project: ${projectKey}`);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(usersUrl, {
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
        console.error(`Failed to get users: ${response.status} - ${errorText}`);

        // If the specific API fails, try a fallback approach
        if (response.status === 400 && projectKey) {
          console.log("Trying fallback user search...");

          const fallbackUrl = `https://${cleanDomain}/rest/api/3/user/search?query=`;
          const fallbackController = new AbortController();
          const fallbackTimeoutId = setTimeout(
            () => fallbackController.abort(),
            30000,
          );

          try {
            const fallbackResponse = await fetch(fallbackUrl, {
              method: "GET",
              headers: {
                Authorization: `Basic ${auth}`,
                Accept: "application/json",
                "User-Agent": "Jira-Board-App/1.0",
              },
              signal: fallbackController.signal,
            });

            clearTimeout(fallbackTimeoutId);

            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              return NextResponse.json(fallbackData || []);
            }
          } catch (fallbackError) {
            clearTimeout(fallbackTimeoutId);
            console.error("Fallback user search also failed:", fallbackError);
          }
        }

        return NextResponse.json(
          { error: `Failed to get users: ${errorText}` },
          { status: response.status },
        );
      }

      const usersData = await response.json();
      return NextResponse.json(usersData || []);
    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout while fetching users" },
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

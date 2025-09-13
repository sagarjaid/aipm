import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { domain, email, apiToken, issueKey, transitionId } =
      await request.json();

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

    // If transitionId is provided, execute the transition
    if (transitionId) {
      const transitionUrl = `https://${cleanDomain}/rest/api/3/issue/${issueKey}/transitions`;

      console.log(
        `Transitioning issue: ${issueKey} to transition: ${transitionId}`,
      );

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      try {
        const response = await fetch(transitionUrl, {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Jira-Board-App/1.0",
          },
          body: JSON.stringify({
            transition: {
              id: transitionId,
            },
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Failed to transition issue: ${response.status} - ${errorText}`,
          );
          return NextResponse.json(
            { error: `Failed to transition issue: ${errorText}` },
            { status: response.status },
          );
        }

        return NextResponse.json({
          success: true,
          message: "Issue status updated successfully",
        });
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } else {
      // Get available transitions
      const transitionsUrl = `https://${cleanDomain}/rest/api/3/issue/${issueKey}/transitions`;

      console.log(`Getting transitions for issue: ${issueKey}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      try {
        const response = await fetch(transitionsUrl, {
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
            `Failed to get transitions: ${response.status} - ${errorText}`,
          );
          return NextResponse.json(
            { error: `Failed to get transitions: ${errorText}` },
            { status: response.status },
          );
        }

        const transitionsData = await response.json();
        return NextResponse.json(transitionsData);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    }
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: `Server error: ${error.message || "Unknown error occurred"}` },
      { status: 500 },
    );
  }
}

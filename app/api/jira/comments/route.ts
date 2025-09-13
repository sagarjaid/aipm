import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");
    const email = searchParams.get("email");
    const apiToken = searchParams.get("apiToken");
    const issueKey = searchParams.get("issueKey");

    if (!domain || !email || !apiToken || !issueKey) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    // Clean domain
    let cleanDomain = domain.trim().replace(/^https?:\/\//, "");
    if (!cleanDomain.includes(".atlassian.net")) {
      cleanDomain = `${cleanDomain}.atlassian.net`;
    }

    const auth = Buffer.from(`${email}:${apiToken}`).toString("base64");
    // Add expand parameter to get mentions and other rich content
    const commentsUrl = `https://${cleanDomain}/rest/api/3/issue/${issueKey}/comment?expand=renderedBody`;

    console.log(`Getting comments for issue: ${issueKey}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(commentsUrl, {
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
          `Failed to get comments: ${response.status} - ${errorText}`,
        );
        return NextResponse.json(
          { error: `Failed to get comments: ${errorText}` },
          { status: response.status },
        );
      }

      const commentsData = await response.json();

      // Sort comments by created date (newest first) and fix mention formatting
      if (commentsData.comments) {
        commentsData.comments.sort((a: any, b: any) => {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        });

        // Fix double @ symbols in comment bodies
        commentsData.comments = commentsData.comments.map((comment: any) => {
          if (comment.body && comment.body.content) {
            comment.body = fixMentionFormatting(comment.body);
          }
          return comment;
        });
      }

      return NextResponse.json(commentsData);
    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout while fetching comments" },
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

export async function POST(request: NextRequest) {
  try {
    const { domain, email, apiToken, issueKey, comment } = await request.json();

    if (!domain || !email || !apiToken || !issueKey || !comment) {
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
    const commentsUrl = `https://${cleanDomain}/rest/api/3/issue/${issueKey}/comment`;

    console.log(`Adding comment to issue: ${issueKey}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(commentsUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Jira-Board-App/1.0",
        },
        body: JSON.stringify({
          body: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: comment,
                  },
                ],
              },
            ],
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Failed to add comment: ${response.status} - ${errorText}`,
        );
        return NextResponse.json(
          { error: `Failed to add comment: ${errorText}` },
          { status: response.status },
        );
      }

      const commentData = await response.json();
      return NextResponse.json(commentData);
    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout while adding comment" },
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

// Add helper function to fix mention formatting
function fixMentionFormatting(body: any): any {
  if (!body || !body.content) return body;

  const processNode = (node: any): any => {
    if (node.type === "mention" && node.attrs) {
      // Ensure mention text doesn't have double @
      if (node.attrs.text && node.attrs.text.startsWith("@@")) {
        node.attrs.text = node.attrs.text.substring(1); // Remove one @
      }
      if (node.attrs.displayName && node.attrs.displayName.startsWith("@@")) {
        node.attrs.displayName = node.attrs.displayName.substring(1); // Remove one @
      }
    }

    if (node.content && Array.isArray(node.content)) {
      node.content = node.content.map(processNode);
    }

    return node;
  };

  return {
    ...body,
    content: body.content.map(processNode),
  };
}

import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { domain, email, apiToken, boardId } = await request.json();

    if (!domain || !email || !apiToken) {
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
    const results = [];

    // Test 1: Basic connectivity
    try {
      const testUrl = `https://${cleanDomain}/rest/api/3/myself`;
      const response = await fetch(testUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
        },
      });

      results.push({
        test: "Basic Authentication",
        url: testUrl,
        status: response.status,
        success: response.ok,
        data: response.ok ? await response.json() : await response.text(),
      });
    } catch (error) {
      results.push({
        test: "Basic Authentication",
        success: false,
        error: error.message,
      });
    }

    // Test 2: Board access
    if (boardId) {
      try {
        const boardUrl = `https://${cleanDomain}/rest/agile/1.0/board/${boardId}`;
        const response = await fetch(boardUrl, {
          method: "GET",
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
        });

        results.push({
          test: "Board Access",
          url: boardUrl,
          status: response.status,
          success: response.ok,
          data: response.ok ? await response.json() : await response.text(),
        });
      } catch (error) {
        results.push({
          test: "Board Access",
          success: false,
          error: error.message,
        });
      }

      // Test 3: Sprint access
      try {
        const sprintUrl = `https://${cleanDomain}/rest/agile/1.0/board/${boardId}/sprint`;
        const response = await fetch(sprintUrl, {
          method: "GET",
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
        });

        results.push({
          test: "Sprint Access",
          url: sprintUrl,
          status: response.status,
          success: response.ok,
          data: response.ok ? await response.json() : await response.text(),
        });
      } catch (error) {
        results.push({
          test: "Sprint Access",
          success: false,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      domain: cleanDomain,
      boardId,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Debug error: ${error.message}`,
      },
      { status: 500 },
    );
  }
}

/** @format */

export const formatLastUsed = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  } catch (error) {
    return "Unknown";
  }
};

export const getBoardTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "scrum":
      return "bg-blue-100 text-blue-800";
    case "kanban":
      return "bg-green-100 text-green-800";
    case "simple":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-purple-100 text-purple-800";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "highest":
    case "high":
      return "text-red-600";
    case "medium":
      return "text-orange-500";
    case "low":
    case "lowest":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

export const getPriorityIcon = (priority: any) => {
  return priority?.iconUrl || "/placeholder.svg";
};

export const extractTextFromDescription = (description: any): string => {
  if (!description) return "";
  if (typeof description === "string") return description;
  if (typeof description === "object" && description.content) {
    try {
      return extractTextFromADF(description);
    } catch (error) {
      return "Description could not be displayed (unsupported format)";
    }
  }
  return "No description available";
};

export const extractTextFromADF = (node: any): string => {
  if (!node) return "";
  if (node.type === "text" && node.text) return node.text;
  if (node.content && Array.isArray(node.content)) {
    return node.content.map((child: any) => extractTextFromADF(child)).join("");
  }
  switch (node.type) {
    case "paragraph":
      return extractTextFromADF({ content: node.content }) + "\n\n";
    case "hardBreak":
      return "\n";
    case "listItem":
      return "• " + extractTextFromADF({ content: node.content }) + "\n";
    case "orderedList":
    case "bulletList":
      return extractTextFromADF({ content: node.content }) + "\n";
    default:
      if (node.content) return extractTextFromADF({ content: node.content });
      return "";
  }
};

export const extractMentionsAndText = (
  body: any,
): {
  text: string;
  mentions: Array<{ accountId: string; displayName: string }>;
} => {
  const mentions: Array<{ accountId: string; displayName: string }> = [];

  const extractFromNode = (node: any): string => {
    if (!node) return "";

    if (node.type === "text" && node.text) {
      return node.text;
    }

    if (node.type === "mention" && node.attrs) {
      const displayName =
        node.attrs.text || node.attrs.displayName || "Unknown User";
      const cleanDisplayName = displayName.startsWith("@@")
        ? displayName.substring(1)
        : displayName;

      const mention = {
        accountId: node.attrs.id || "",
        displayName: cleanDisplayName.startsWith("@")
          ? cleanDisplayName.substring(1)
          : cleanDisplayName,
      };
      mentions.push(mention);
      return `@${mention.displayName}`;
    }

    if (node.content && Array.isArray(node.content)) {
      return node.content.map((child: any) => extractFromNode(child)).join("");
    }

    switch (node.type) {
      case "paragraph":
        return extractFromNode({ content: node.content }) + "\n\n";
      case "hardBreak":
        return "\n";
      case "listItem":
        return "• " + extractFromNode({ content: node.content }) + "\n";
      case "orderedList":
      case "bulletList":
        return extractFromNode({ content: node.content }) + "\n";
      default:
        if (node.content) return extractFromNode({ content: node.content });
        return "";
    }
  };

  const text = extractFromNode(body);
  return { text: text.trim(), mentions };
};

export const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleString();
  } catch (error) {
    return dateString;
  }
};

export const formatRelativeTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  } catch (error) {
    return dateString;
  }
};

export const safeGet = (obj: any, path: string, defaultValue: any = null) => {
  try {
    return (
      path.split(".").reduce((current, key) => current?.[key], obj) ??
      defaultValue
    );
  } catch {
    return defaultValue;
  }
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Board selection persistence utilities
export const saveLastSelectedBoard = (configId: string, boardId: string) => {
  try {
    const lastBoardKey = `jiraLastBoard_${configId}`;
    localStorage.setItem(lastBoardKey, boardId);
  } catch (error) {
    console.error("Failed to save last selected board:", error);
  }
};

export const getLastSelectedBoard = (configId: string): string | null => {
  try {
    const lastBoardKey = `jiraLastBoard_${configId}`;
    return localStorage.getItem(lastBoardKey);
  } catch (error) {
    console.error("Failed to get last selected board:", error);
    return null;
  }
};

export const clearLastSelectedBoard = (configId: string) => {
  try {
    const lastBoardKey = `jiraLastBoard_${configId}`;
    localStorage.removeItem(lastBoardKey);
  } catch (error) {
    console.error("Failed to clear last selected board:", error);
  }
};

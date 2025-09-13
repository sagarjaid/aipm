export interface JiraBoard {
  id: number;
  name: string;
  type: string;
  location?: {
    projectId?: number;
    projectName?: string;
    projectKey?: string;
  };
  self: string;
}

export interface JiraConfig {
  id: string;
  domain: string;
  email: string;
  apiToken: string;
  displayName?: string;
  lastUsed: string;
  createdAt: string;
}

export interface SavedConfig extends JiraConfig {
  isActive?: boolean;
}

export interface JiraIssue {
  id: string;
  key: string;
  fields: {
    summary: string;
    description?: any;
    status: {
      name: string;
      statusCategory: {
        key: string;
        colorName: string;
      };
    };
    assignee?: {
      accountId: string;
      displayName: string;
      avatarUrls: {
        "24x24": string;
        "48x48": string;
      };
    };
    reporter?: {
      displayName: string;
      avatarUrls: {
        "48x48": string;
      };
    };
    priority: {
      id: string;
      name: string;
      iconUrl: string;
    };
    issuetype: {
      name: string;
      iconUrl: string;
    };
    created: string;
    updated: string;
    storyPoints?: number;
    labels?: string[];
    components?: Array<{ name: string }>;
    fixVersions?: Array<{ name: string; id: string }>;
    project: {
      key: string;
      name: string;
      avatarUrls: {
        "24x24": string;
        "48x48": string;
      };
    };
  };
}

export interface JiraSprint {
  id: number;
  name: string;
  state: string;
  startDate?: string;
  endDate?: string;
  goal?: string;
}

export interface BoardData {
  id: string;
  name: string;
  type: string;
}

export interface JiraUser {
  accountId: string;
  displayName: string;
  avatarUrls: {
    "48x48": string;
  };
  emailAddress?: string;
}

export interface Transition {
  id: string;
  name: string;
  to: {
    name: string;
    statusCategory: {
      key: string;
    };
  };
}

export interface JiraComment {
  id: string;
  author: {
    accountId: string;
    displayName: string;
    avatarUrls: {
      "48x48": string;
    };
  };
  body: any;
  created: string;
  updated: string;
  updateAuthor?: {
    displayName: string;
    avatarUrls: {
      "48x48": string;
    };
  };
}

export type ViewMode = "list" | "grid";

export interface Filters {
  assignees: string[];
  types: string[];
  statuses: string[];
  labels: string[];
  fixVersions: string[];
}

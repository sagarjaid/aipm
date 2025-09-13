"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import type { JiraIssue, Transition } from "@/lib/jira-types";
import { getPriorityColor, getPriorityIcon } from "@/lib/jira-utils";

interface IssueGridViewProps {
  issues: JiraIssue[];
  transitions: Transition[];
  updating: string | null;
  onIssueClick: (issue: JiraIssue) => void;
  onUpdateIssueStatus: (issueKey: string, transitionId: string) => void;
}

export function IssueGridView({
  issues,
  transitions,
  updating,
  onIssueClick,
  onUpdateIssueStatus,
}: IssueGridViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {issues.map((issue) => (
        <Card
          key={issue.id}
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => onIssueClick(issue)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-sm font-medium text-blue-600">
                {issue.key}
              </CardTitle>
              <Select
                value={issue.fields.status.name}
                onValueChange={(transitionId) =>
                  onUpdateIssueStatus(issue.key, transitionId)
                }
                disabled={updating === issue.key}
              >
                <SelectTrigger className="h-auto w-auto border-none p-1 shadow-none hover:bg-gray-100">
                  <SelectValue>
                    <Badge className="bg-gray-100 text-gray-700">
                      {issue.fields.status.name}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {transitions.length > 0 ? (
                    transitions.map((transition) => (
                      <SelectItem key={transition.id} value={transition.id}>
                        {transition.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-transitions" disabled>
                      No transitions available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <CardDescription className="line-clamp-2 text-sm font-medium text-gray-900">
              {issue.fields.summary}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      issue.fields.issuetype.iconUrl ||
                      "/placeholder.svg?height=16&width=16"
                    }
                    alt={issue.fields.issuetype.name}
                    className="h-4 w-4"
                  />
                  <span className="text-xs text-gray-600">
                    {issue.fields.issuetype.name}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    src={
                      getPriorityIcon(issue.fields.priority) ||
                      "/placeholder.svg"
                    }
                    alt={issue.fields.priority.name}
                    className="h-4 w-4"
                  />
                  <span
                    className={`text-xs ${getPriorityColor(issue.fields.priority.name)}`}
                  >
                    {issue.fields.priority.name}
                  </span>
                </div>
              </div>

              {issue.fields.assignee ? (
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white"
                    style={{
                      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                    }}
                  >
                    {issue.fields.assignee.displayName
                      ?.charAt(0)
                      ?.toUpperCase() || "?"}
                  </div>
                  <span className="text-xs text-gray-600">
                    {issue.fields.assignee.displayName || "Unknown User"}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-400">Unassigned</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

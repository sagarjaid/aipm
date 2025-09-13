"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";
import type { JiraIssue, JiraUser, Transition } from "@/lib/jira-types";
import { getPriorityColor, getPriorityIcon } from "@/lib/jira-utils";

interface IssueListViewProps {
  issues: JiraIssue[];
  users: JiraUser[];
  priorities: any[];
  transitions: Transition[];
  updating: string | null;
  onIssueClick: (issue: JiraIssue) => void;
  onUpdateIssueField: (
    issueKey: string,
    fieldName: string,
    fieldValue: any,
  ) => void;
  onUpdateIssueStatus: (issueKey: string, transitionId: string) => void;
}

export function IssueListView({
  issues,
  users,
  priorities,
  transitions,
  updating,
  onIssueClick,
  onUpdateIssueField,
  onUpdateIssueStatus,
}: IssueListViewProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="w-16 min-w-[60px] px-4 py-3 text-left text-sm font-medium text-gray-700">
                Type
              </th>
              <th className="w-32 min-w-[120px] px-4 py-3 text-left text-sm font-medium text-gray-700">
                Key
              </th>
              <th className="w-48 min-w-[180px] px-4 py-3 text-left text-sm font-medium text-gray-700">
                Assignee
              </th>
              <th className="w-32 min-w-[120px] px-4 py-3 text-left text-sm font-medium text-gray-700">
                Priority
              </th>
              <th className="w-32 min-w-[120px] px-4 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="min-w-[300px] flex-1 px-4 py-3 text-left text-sm font-medium text-gray-700">
                Summary
              </th>
              <th className="w-32 min-w-[100px] px-4 py-3 text-left text-sm font-medium text-gray-700">
                Story Points
              </th>
              <th className="w-12 min-w-[48px] px-4 py-3 text-center text-sm font-medium text-gray-700">
                <Plus className="mx-auto h-4 w-4" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {issues.map((issue) => (
              <tr key={issue.id} className="hover:bg-gray-50">
                <td className="w-16 px-4 py-3">
                  <img
                    src={
                      issue.fields.issuetype.iconUrl ||
                      "/placeholder.svg?height=16&width=16"
                    }
                    alt={issue.fields.issuetype.name}
                    className="h-4 w-4"
                  />
                </td>
                <td className="w-32 px-4 py-3">
                  <button
                    onClick={() => onIssueClick(issue)}
                    className="whitespace-nowrap font-medium text-blue-600 hover:underline"
                  >
                    {issue.key}
                  </button>
                </td>
                <td className="w-48 px-4 py-3">
                  <Select
                    value={issue.fields.assignee?.accountId || "unassigned"}
                    onValueChange={(value) => {
                      if (value === "unassigned") {
                        onUpdateIssueField(issue.key, "assignee", null);
                      } else {
                        onUpdateIssueField(issue.key, "assignee", {
                          accountId: value,
                        });
                      }
                    }}
                    disabled={updating === issue.key}
                  >
                    <SelectTrigger className="h-auto w-full border-none p-1 shadow-none hover:bg-gray-100">
                      <SelectValue>
                        {issue.fields.assignee ? (
                          <div className="flex min-w-0 items-center gap-2">
                            <div
                              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                              style={{
                                backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                              }}
                            >
                              {issue.fields.assignee.displayName
                                ?.charAt(0)
                                ?.toUpperCase() || "?"}
                            </div>
                            <span className="truncate text-sm">
                              {issue.fields.assignee.displayName ||
                                "Unknown User"}
                            </span>
                          </div>
                        ) : (
                          <span className="whitespace-nowrap text-sm text-gray-500">
                            Unassigned
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">
                        <span className="text-gray-500">Unassigned</span>
                      </SelectItem>
                      {users.map((user) => (
                        <SelectItem key={user.accountId} value={user.accountId}>
                          <div className="flex items-center gap-2">
                            <div
                              className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white"
                              style={{
                                backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                              }}
                            >
                              {user.displayName?.charAt(0)?.toUpperCase() ||
                                "?"}
                            </div>
                            {user.displayName || "Unknown User"}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="w-32 px-4 py-3">
                  <Select
                    value={issue.fields.priority.id}
                    onValueChange={(value) =>
                      onUpdateIssueField(issue.key, "priority", { id: value })
                    }
                    disabled={updating === issue.key}
                  >
                    <SelectTrigger className="h-auto w-full border-none p-1 shadow-none hover:bg-gray-100">
                      <SelectValue>
                        <div className="flex min-w-0 items-center gap-2">
                          <img
                            src={
                              getPriorityIcon(issue.fields.priority) ||
                              "/placeholder.svg"
                            }
                            alt={issue.fields.priority.name}
                            className="h-4 w-4"
                          />
                          <span
                            className={`whitespace-nowrap text-sm ${getPriorityColor(issue.fields.priority.name)}`}
                          >
                            {issue.fields.priority.name}
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.length > 0 ? (
                        priorities.map((priority) => (
                          <SelectItem key={priority.id} value={priority.id}>
                            <div className="flex items-center gap-2">
                              <img
                                src={
                                  getPriorityIcon(priority) ||
                                  "/placeholder.svg"
                                }
                                alt={priority.name}
                                className="h-4 w-4"
                              />
                              <span className={getPriorityColor(priority.name)}>
                                {priority.name}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <>
                          <SelectItem value="1">
                            <div className="flex items-center gap-2">
                              <Minus className="h-3 w-4 text-red-600" />
                              <span className="text-red-600">Highest</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="2">
                            <div className="flex items-center gap-2">
                              <Minus className="h-3 w-4 text-red-600" />
                              <span className="text-red-600">High</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="3">
                            <div className="flex items-center gap-2">
                              <Minus className="h-3 w-4 text-orange-500" />
                              <span className="text-orange-500">Medium</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="4">
                            <div className="flex items-center gap-2">
                              <Minus className="h-3 w-4 text-green-600" />
                              <span className="text-green-600">Low</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="5">
                            <div className="flex items-center gap-2">
                              <Minus className="h-3 w-4 text-green-600" />
                              <span className="text-green-600">Lowest</span>
                            </div>
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </td>
                <td className="w-32 px-4 py-3">
                  <Select
                    value={issue.fields.status.name}
                    onValueChange={(transitionId) =>
                      onUpdateIssueStatus(issue.key, transitionId)
                    }
                    disabled={updating === issue.key}
                  >
                    <SelectTrigger className="h-auto w-full border-none p-1 shadow-none hover:bg-gray-100">
                      <SelectValue>
                        <div className="flex items-center gap-1 whitespace-nowrap rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700">
                          {issue.fields.status.name.toUpperCase()}
                        </div>
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
                </td>
                <td className="min-w-[300px] px-4 py-3">
                  <button
                    onClick={() => onIssueClick(issue)}
                    className="w-full truncate text-left text-sm text-gray-900 hover:text-blue-600"
                    title={issue.fields.summary}
                  >
                    {issue.fields.summary}
                  </button>
                </td>
                <td className="w-32 px-4 py-3 text-center">
                  <span className="whitespace-nowrap text-sm text-gray-600">
                    {issue.fields.storyPoints || "None"}
                  </span>
                </td>
                <td className="w-12 px-4 py-3 text-center">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Plus className="h-3 w-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

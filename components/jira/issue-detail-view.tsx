"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageSquare,
  Edit,
  Save,
  X,
  Send,
  RefreshCw,
  UserIcon,
  Flag,
} from "lucide-react";
import type {
  JiraIssue,
  JiraUser,
  Transition,
  JiraComment,
} from "@/lib/jira-types";
import {
  safeGet,
  formatDate,
  formatRelativeTime,
  extractTextFromDescription,
  extractMentionsAndText,
  getPriorityColor,
} from "@/lib/jira-utils";

interface IssueDetailViewProps {
  selectedIssue: JiraIssue;
  users: JiraUser[];
  priorities: any[];
  transitions: Transition[];
  comments: JiraComment[];
  updating: string | null;
  addingComment: boolean;
  newComment: string;
  setNewComment: (comment: string) => void;
  editMode: string | null;
  setEditMode: (mode: string | null) => void;
  editSummary: string;
  setEditSummary: (summary: string) => void;
  editDescription: string;
  setEditDescription: (description: string) => void;
  commentsLoading: boolean;
  onUpdateIssueField: (
    issueKey: string,
    fieldName: string,
    fieldValue: any,
  ) => void;
  onUpdateIssueStatus: (issueKey: string, transitionId: string) => void;
  onAddComment: () => void;
  onSaveField: (fieldName: string) => void;
  onCancelEdit: () => void;
}

export function IssueDetailView({
  selectedIssue,
  users,
  priorities,
  transitions,
  comments,
  updating,
  addingComment,
  newComment,
  setNewComment,
  editMode,
  setEditMode,
  editSummary,
  setEditSummary,
  editDescription,
  setEditDescription,
  commentsLoading,
  onUpdateIssueField,
  onUpdateIssueStatus,
  onAddComment,
  onSaveField,
  onCancelEdit,
}: IssueDetailViewProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main Content */}
      <div className="space-y-6 lg:col-span-2">
        {/* Issue Summary */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <img
                src={
                  safeGet(selectedIssue, "fields.issuetype.iconUrl") ||
                  "/placeholder.svg?height=24&width=24"
                }
                alt={safeGet(selectedIssue, "fields.issuetype.name", "Unknown")}
                className="mt-1 h-6 w-6 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                {editMode === "summary" ? (
                  <div className="space-y-3">
                    <Input
                      value={editSummary}
                      onChange={(e) => setEditSummary(e.target.value)}
                      className="text-xl font-semibold"
                      disabled={updating === selectedIssue.key}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => onSaveField("summary")}
                        disabled={
                          updating === selectedIssue.key || !editSummary.trim()
                        }
                      >
                        <Save className="mr-1 h-4 w-4" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={onCancelEdit}
                        disabled={updating === selectedIssue.key}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="group">
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="min-w-0 flex-1 break-words text-xl">
                        {safeGet(selectedIssue, "fields.summary", "No Summary")}
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditMode("summary")}
                        className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                <CardDescription className="mt-2 flex flex-wrap items-center gap-2">
                  <span>
                    {safeGet(
                      selectedIssue,
                      "fields.issuetype.name",
                      "Unknown Type",
                    )}
                  </span>
                  <span>•</span>
                  <span>
                    Created {formatDate(selectedIssue.fields.created)}
                  </span>
                  <span>•</span>
                  <span>
                    Updated {formatDate(selectedIssue.fields.updated)}
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {editMode === "description" ? (
              <div className="space-y-3">
                <Textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={6}
                  disabled={updating === selectedIssue.key}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onSaveField("description")}
                    disabled={updating === selectedIssue.key}
                  >
                    <Save className="mr-1 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onCancelEdit}
                    disabled={updating === selectedIssue.key}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="group">
                <div className="flex items-start justify-between gap-4">
                  <div className="prose min-w-0 max-w-none flex-1">
                    <div className="overflow-wrap-anywhere whitespace-pre-wrap break-words text-gray-700">
                      {extractTextFromDescription(
                        selectedIssue.fields.description,
                      ) || "No description"}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditMode("description")}
                    className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Activity
              {comments.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {comments.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add Comment Form */}
            <div className="mb-6 rounded-lg border bg-gray-50 p-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  disabled={addingComment}
                  className="resize-none"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={onAddComment}
                    disabled={addingComment || !newComment.trim()}
                    size="sm"
                  >
                    {addingComment ? (
                      <>
                        <RefreshCw className="mr-1 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Send className="mr-1 h-4 w-4" />
                        Add Comment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments List */}
            {commentsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => {
                  const { text, mentions } = extractMentionsAndText(
                    comment.body,
                  );
                  return (
                    <div key={comment.id} className="flex gap-3">
                      <img
                        src={
                          comment.author.avatarUrls["48x48"] ||
                          "/placeholder.svg?height=40&width=40"
                        }
                        alt={comment.author.displayName}
                        className="h-10 w-10 flex-shrink-0 rounded-full"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium">
                            {comment.author.displayName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatRelativeTime(comment.created)}
                          </span>
                          {comment.created !== comment.updated && (
                            <span className="text-xs text-gray-400">
                              (edited)
                            </span>
                          )}
                        </div>

                        <div className="rounded-lg bg-gray-50 p-3">
                          <div className="overflow-wrap-anywhere whitespace-pre-wrap break-words text-sm text-gray-700">
                            {text || extractTextFromDescription(comment.body)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <p>No comments yet</p>
                <p className="text-sm">Be the first to add a comment!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase text-gray-500">
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedIssue.fields.status.name}
              onValueChange={(transitionId) =>
                onUpdateIssueStatus(selectedIssue.key, transitionId)
              }
              disabled={updating === selectedIssue.key}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {safeGet(
                        selectedIssue,
                        "fields.status.name",
                        "Unknown Status",
                      )}
                    </span>
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
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase text-gray-500">
              Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Assignee */}
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">
                Assignee
              </div>
              <Select
                value={selectedIssue.fields.assignee?.accountId || "unassigned"}
                onValueChange={(value) => {
                  if (value === "unassigned") {
                    onUpdateIssueField(selectedIssue.key, "assignee", null);
                  } else {
                    onUpdateIssueField(selectedIssue.key, "assignee", {
                      accountId: value,
                    });
                  }
                }}
                disabled={updating === selectedIssue.key}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {selectedIssue.fields.assignee ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            safeGet(
                              selectedIssue,
                              "fields.assignee.avatarUrls.48x48",
                            ) ||
                            "/placeholder.svg?height=32&width=32" ||
                            "/placeholder.svg"
                          }
                          alt={safeGet(
                            selectedIssue,
                            "fields.assignee.displayName",
                            "Unknown User",
                          )}
                          className="h-8 w-8 flex-shrink-0 rounded-full"
                        />
                        <span className="truncate text-sm">
                          {safeGet(
                            selectedIssue,
                            "fields.assignee.displayName",
                            "Unknown User",
                          )}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500">
                        <UserIcon className="h-4 w-4" />
                        <span className="text-sm">Unassigned</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      Unassigned
                    </div>
                  </SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.accountId} value={user.accountId}>
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            user.avatarUrls["48x48"] ||
                            "/placeholder.svg?height=24&width=24"
                          }
                          alt={user.displayName}
                          className="h-5 w-5 rounded-full"
                        />
                        {user.displayName}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reporter */}
            {selectedIssue.fields.reporter && (
              <div>
                <div className="mb-2 text-sm font-medium text-gray-700">
                  Reporter
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      safeGet(
                        selectedIssue,
                        "fields.reporter.avatarUrls.48x48",
                      ) ||
                      "/placeholder.svg?height=32&width=32" ||
                      "/placeholder.svg"
                    }
                    alt={safeGet(
                      selectedIssue,
                      "fields.reporter.displayName",
                      "Unknown User",
                    )}
                    className="h-8 w-8 flex-shrink-0 rounded-full"
                  />
                  <div className="truncate text-sm font-medium">
                    {safeGet(
                      selectedIssue,
                      "fields.reporter.displayName",
                      "Unknown User",
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Priority */}
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">
                Priority
              </div>
              <Select
                value={safeGet(selectedIssue, "fields.priority.id", "3")}
                onValueChange={(value) =>
                  onUpdateIssueField(selectedIssue.key, "priority", {
                    id: value,
                  })
                }
                disabled={updating === selectedIssue.key}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          safeGet(selectedIssue, "fields.priority.iconUrl") ||
                          "/placeholder.svg?height=16&width=16" ||
                          "/placeholder.svg"
                        }
                        alt={safeGet(
                          selectedIssue,
                          "fields.priority.name",
                          "Medium",
                        )}
                        className="h-4 w-4"
                      />
                      <span
                        className={`text-sm ${getPriorityColor(
                          safeGet(
                            selectedIssue,
                            "fields.priority.name",
                            "medium",
                          ),
                        )}`}
                      >
                        {safeGet(
                          selectedIssue,
                          "fields.priority.name",
                          "Medium",
                        )}
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
                              priority.iconUrl ||
                              "/placeholder.svg?height=16&width=16"
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
                          <Flag className="h-4 w-4 text-red-600" />
                          <span className="text-red-600">Highest</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="2">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-red-600" />
                          <span className="text-red-600">High</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="3">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-yellow-600" />
                          <span className="text-yellow-600">Medium</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="4">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Low</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="5">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Lowest</span>
                        </div>
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Story Points */}
            {selectedIssue.fields.storyPoints !== undefined && (
              <div>
                <div className="mb-2 text-sm font-medium text-gray-700">
                  Story Points
                </div>
                <div className="text-sm">
                  {selectedIssue.fields.storyPoints || "None"}
                </div>
              </div>
            )}

            {/* Labels */}
            {selectedIssue.fields.labels &&
              selectedIssue.fields.labels.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    Labels
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedIssue.fields.labels.map((label) => (
                      <Badge
                        key={label}
                        variant="secondary"
                        className="break-all text-xs"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            {/* Components */}
            {selectedIssue.fields.components &&
              selectedIssue.fields.components.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    Components
                  </div>
                  <div className="space-y-1">
                    {selectedIssue.fields.components.map((component) => (
                      <div key={component.name} className="break-words text-sm">
                        {component.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Fix Versions */}
            {selectedIssue.fields.fixVersions &&
              selectedIssue.fields.fixVersions.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-medium text-gray-700">
                    Fix Version/s
                  </div>
                  <div className="space-y-1">
                    {selectedIssue.fields.fixVersions.map((version) => (
                      <div key={version.name} className="break-words text-sm">
                        {version.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

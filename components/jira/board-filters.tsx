/** @format */

"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, ChevronDown, List, Grid3X3 } from "lucide-react";
import type { Filters, JiraIssue, JiraUser } from "@/lib/jira-types";

interface BoardFiltersProps {
  filters: Filters;
  issues: JiraIssue[];
  users: JiraUser[];
  onToggleFilter: (filterType: keyof Filters, value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
}

export function BoardFilters({
  filters,
  issues,
  users,
  onToggleFilter,
  onClearFilters,
  hasActiveFilters,
  viewMode,
  onViewModeChange,
}: BoardFiltersProps) {
  const getUniqueValues = (field: string) => {
    const values = new Set<string>();
    issues.forEach((issue) => {
      switch (field) {
        case "type":
          values.add(issue.fields.issuetype.name);
          break;
        case "status":
          values.add(issue.fields.status.name);
          break;
        case "label":
          issue.fields.labels?.forEach((label) => values.add(label));
          break;
        case "fixVersion":
          issue.fields.fixVersions?.forEach((version) =>
            values.add(version.name),
          );
          break;
      }
    });
    return Array.from(values);
  };

  const getFilterLabel = (filterType: keyof Filters, allLabel: string) => {
    const selectedCount = filters[filterType].length;
    if (selectedCount === 0) return allLabel;
    if (selectedCount === 1) {
      const selected = filters[filterType][0];
      switch (filterType) {
        case "assignees": {
          if (selected === "unassigned") return "Unassigned";
          const user = users.find((u) => u.accountId === selected);
          return user?.displayName || "Unknown User";
        }
        case "types":
          return selected;
        case "statuses":
          return selected;
        case "labels":
          return selected;
        case "fixVersions": {
          const version = issues
            .flatMap((i) => i.fields.fixVersions || [])
            .find((v) => v.id === selected);
          return version?.name || "Unknown Version";
        }
        default:
          return selected;
      }
    }
    return `${selectedCount} selected`;
  };

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        {/* Assignee Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[140px] justify-between bg-transparent"
            >
              {getFilterLabel("assignees", "All Assignees")}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <div className="p-4">
              <h4 className="mb-3 text-sm font-medium">Assignees</h4>
              <div className="max-h-64 space-y-2 overflow-y-auto">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unassigned"
                    checked={filters.assignees.includes("unassigned")}
                    onCheckedChange={() =>
                      onToggleFilter("assignees", "unassigned")
                    }
                  />
                  <label htmlFor="unassigned" className="text-sm">
                    Unassigned
                  </label>
                </div>
                {users.map((user) => (
                  <div
                    key={user.accountId}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={user.accountId}
                      checked={filters.assignees.includes(user.accountId)}
                      onCheckedChange={() =>
                        onToggleFilter("assignees", user.accountId)
                      }
                    />
                    <label
                      htmlFor={user.accountId}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className="flex h-4 w-4 items-center justify-center rounded-full text-xs font-medium text-white"
                        style={{
                          backgroundColor: `#${Math.floor(
                            Math.random() * 16777215,
                          ).toString(16)}`,
                        }}
                      >
                        {user.displayName.charAt(0).toUpperCase()}
                      </div>
                      {user.displayName}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Type Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[120px] justify-between bg-transparent"
            >
              {getFilterLabel("types", "All Types")}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <div className="p-4">
              <h4 className="mb-3 text-sm font-medium">Issue Types</h4>
              <div className="max-h-64 space-y-2 overflow-y-auto">
                {getUniqueValues("type").map((type) => {
                  const issue = issues.find(
                    (i) => i.fields.issuetype.name === type,
                  );
                  return (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={filters.types.includes(type)}
                        onCheckedChange={() => onToggleFilter("types", type)}
                      />
                      <label
                        htmlFor={type}
                        className="flex items-center gap-2 text-sm"
                      >
                        <img
                          src={
                            issue?.fields.issuetype.iconUrl ||
                            "/placeholder.svg?height=16&width=16"
                          }
                          alt={type}
                          className="h-4 w-4"
                        />
                        {type}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Status Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[120px] justify-between bg-transparent"
            >
              {getFilterLabel("statuses", "All Statuses")}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <div className="p-4">
              <h4 className="mb-3 text-sm font-medium">Statuses</h4>
              <div className="max-h-64 space-y-2 overflow-y-auto">
                {getUniqueValues("status").map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={status}
                      checked={filters.statuses.includes(status)}
                      onCheckedChange={() => onToggleFilter("statuses", status)}
                    />
                    <label htmlFor={status} className="text-sm">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Labels Filter */}
        {getUniqueValues("label").length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[120px] justify-between bg-transparent"
              >
                {getFilterLabel("labels", "All Labels")}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="p-4">
                <h4 className="mb-3 text-sm font-medium">Labels</h4>
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {getUniqueValues("label").map((label) => (
                    <div key={label} className="flex items-center space-x-2">
                      <Checkbox
                        id={label}
                        checked={filters.labels.includes(label)}
                        onCheckedChange={() => onToggleFilter("labels", label)}
                      />
                      <label htmlFor={label} className="text-sm">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Fix Versions Filter */}
        {getUniqueValues("fixVersion").length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[140px] justify-between bg-transparent"
              >
                {getFilterLabel("fixVersions", "All Versions")}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="p-4">
                <h4 className="mb-3 text-sm font-medium">Fix Versions</h4>
                <div className="max-h-64 space-y-2 overflow-y-auto">
                  {issues
                    .flatMap((i) => i.fields.fixVersions || [])
                    .filter(
                      (v, i, arr) =>
                        arr.findIndex((version) => version.id === v.id) === i,
                    )
                    .map((version) => (
                      <div
                        key={version.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={version.id}
                          checked={filters.fixVersions.includes(version.id)}
                          onCheckedChange={() =>
                            onToggleFilter("fixVersions", version.id)
                          }
                        />
                        <label htmlFor={version.id} className="text-sm">
                          {version.name}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}

        {/* View Toggle */}
        <div className="ml-auto flex rounded-lg border bg-white p-1">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className="h-8 px-3"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className="h-8 px-3"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

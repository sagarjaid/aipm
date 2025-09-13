import React from "react";

export default function Details() {
  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Details</h2>
        <button className="text-xl leading-none text-gray-400 hover:text-gray-600">
          ✎
        </button>
      </div>
      {/* Assignee & Reporter */}
      <div className="mb-2">
        <div className="mb-1 flex items-center">
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
            DD
          </span>
          <span className="text-sm font-medium text-gray-900">
            Dharmesh Dakhra
          </span>
        </div>
        <a href="#" className="ml-8 text-xs text-blue-600 hover:underline">
          Assign to me
        </a>
      </div>
      <div className="mb-4 flex items-center">
        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
          SJ
        </span>
        <span className="text-sm font-medium text-gray-900">Sagar Jaid</span>
      </div>
      {/* Development Info */}
      <div className="mb-4 text-sm text-gray-700">
        <div className="mb-1 flex items-center">
          <span className="mr-2">2 branches</span>
        </div>
        <div className="mb-1 flex items-center">
          <span className="mr-2">3 commits</span>
          <span className="ml-auto text-xs text-gray-400">5 hours ago</span>
        </div>
        <div className="mb-1 flex items-center">
          <span className="mr-2">2 pull requests</span>
          <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">
            MERGED
          </span>
        </div>
      </div>
      {/* Labels */}
      <div className="mb-4">
        <span className="inline-block rounded border border-gray-300 bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
          HOTFIX
        </span>
      </div>
      {/* Fields */}
      <div className="mb-4 space-y-1 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Due date</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex justify-between">
          <span>Start date</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex justify-between">
          <span>Dependency</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex justify-between">
          <span>Urgency</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex justify-between">
          <span>Business value</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex justify-between">
          <span>Long-Term Opportunity</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex justify-between">
          <span>Complexity of Development</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex justify-between">
          <span>WSJF</span>
          <span className="text-gray-400">0</span>
        </div>
        <div className="flex justify-between">
          <span>WSUF</span>
          <span className="text-gray-400">None</span>
        </div>
        <div className="flex justify-between">
          <span>Sprint</span>
          <a href="#" className="text-blue-600 hover:underline">
            ATRE Sprint 2
          </a>
        </div>
        <div className="flex justify-between">
          <span>Fix versions</span>
          <span className="inline-block rounded border border-gray-300 bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
            RV2.75
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Priority</span>
          <span className="flex items-center">
            <span className="mr-1 h-0.5 w-2 rounded bg-yellow-500"></span>Medium
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Parent</span>
          <span className="inline-flex items-center rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-800">
            <span className="mr-1">⚡</span>ATRE-5 RV2.75.2
          </span>
        </div>
      </div>
      {/* More fields */}
      <div className="mt-6">
        <h3 className="mb-2 text-base font-semibold">More fields</h3>
        <div className="space-y-1 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Story Points</span>
            <span className="text-gray-400">None</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Original estimate</span>
            <span className="inline-block rounded bg-gray-200 px-1.5 py-0.5 text-xs text-gray-600">
              0m
            </span>
          </div>
          <div className="flex justify-between">
            <span>Time tracking</span>
            <span className="text-gray-400">No time logged</span>
          </div>
          <div className="flex justify-between">
            <span>Components</span>
            <span className="text-gray-400">None</span>
          </div>
          <div className="flex justify-between">
            <span>Team</span>
            <span className="text-gray-400">None</span>
          </div>
          <div className="flex justify-between">
            <span>Affects versions</span>
            <span className="text-gray-400">None</span>
          </div>
        </div>
      </div>
    </div>
  );
}

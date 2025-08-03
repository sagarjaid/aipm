import React from "react";

export default function Details() {
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Details</h2>
        <button className="text-gray-400 hover:text-gray-600 text-xl leading-none">✎</button>
      </div>
      {/* Assignee & Reporter */}
      <div className="mb-2">
        <div className="flex items-center mb-1">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mr-2">DD</span>
          <span className="text-sm font-medium text-gray-900">Dharmesh Dakhra</span>
        </div>
        <a href="#" className="text-xs text-blue-600 hover:underline ml-8">Assign to me</a>
      </div>
      <div className="flex items-center mb-4">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mr-2">SJ</span>
        <span className="text-sm font-medium text-gray-900">Sagar Jaid</span>
      </div>
      {/* Development Info */}
      <div className="mb-4 text-sm text-gray-700">
        <div className="flex items-center mb-1">
          <span className="mr-2">2 branches</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="mr-2">3 commits</span>
          <span className="text-xs text-gray-400 ml-auto">5 hours ago</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="mr-2">2 pull requests</span>
          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">MERGED</span>
        </div>
      </div>
      {/* Labels */}
      <div className="mb-4">
        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded border border-gray-300">HOTFIX</span>
      </div>
      {/* Fields */}
      <div className="mb-4 text-sm text-gray-700 space-y-1">
        <div className="flex justify-between"><span>Due date</span><span className="text-gray-400">None</span></div>
        <div className="flex justify-between"><span>Start date</span><span className="text-gray-400">None</span></div>
        <div className="flex justify-between"><span>Dependency</span><span className="text-gray-400">None</span></div>
        <div className="flex justify-between"><span>Urgency</span><span className="text-gray-400">None</span></div>
        <div className="flex justify-between"><span>Business value</span><span className="text-gray-400">None</span></div>
        <div className="flex justify-between"><span>Long-Term Opportunity</span><span className="text-gray-400">None</span></div>
        <div className="flex justify-between"><span>Complexity of Development</span><span className="text-gray-400">None</span></div>
        <div className="flex justify-between"><span>WSJF</span><span className="text-gray-400">0</span></div>
        <div className="flex justify-between"><span>WSUF</span><span className="text-gray-400">None</span></div>
        <div className="flex justify-between"><span>Sprint</span><a href="#" className="text-blue-600 hover:underline">ATRE Sprint 2</a></div>
        <div className="flex justify-between"><span>Fix versions</span><span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded border border-gray-300">RV2.75</span></div>
        <div className="flex justify-between items-center"><span>Priority</span><span className="flex items-center"><span className="w-2 h-0.5 bg-yellow-500 rounded mr-1"></span>Medium</span></div>
        <div className="flex justify-between items-center"><span>Parent</span><span className="inline-flex items-center px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded"><span className="mr-1">⚡</span>ATRE-5 RV2.75.2</span></div>
      </div>
      {/* More fields */}
      <div className="mt-6">
        <h3 className="text-base font-semibold mb-2">More fields</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <div className="flex justify-between"><span>Story Points</span><span className="text-gray-400">None</span></div>
          <div className="flex justify-between items-center"><span>Original estimate</span><span className="inline-block px-1.5 py-0.5 bg-gray-200 text-xs text-gray-600 rounded">0m</span></div>
          <div className="flex justify-between"><span>Time tracking</span><span className="text-gray-400">No time logged</span></div>
          <div className="flex justify-between"><span>Components</span><span className="text-gray-400">None</span></div>
          <div className="flex justify-between"><span>Team</span><span className="text-gray-400">None</span></div>
          <div className="flex justify-between"><span>Affects versions</span><span className="text-gray-400">None</span></div>
        </div>
      </div>
    </div>
  );
}

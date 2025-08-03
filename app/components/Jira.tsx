import React from "react";

export default function Jira() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6 text-gray-900">
      {/* Header */}
      <div className="flex items-center space-x-2 text-xs mb-2">
        <span className="text-purple-700 font-semibold">ATRE-5</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-700">ATRE-160</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">Make Auto rewrite visible for auto and manual both</h1>
        <div className="flex space-x-2">
          <button className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm font-medium">+ Add</button>
          <button className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm font-medium">Apps</button>
        </div>
      </div>
      {/* Description */}
      <div className="mb-4">
        <h2 className="text-base font-semibold mb-1">Description</h2>
        <p className="text-sm mb-2">Use AI to auto-generate posts/captions and hashtags for auto-published content</p>
        <div className="flex items-center mb-1">
          <span className="text-yellow-500 mr-1">⚠️</span>
          <span className="font-semibold text-sm">Warning Text:</span>
        </div>
        <p className="text-xs text-gray-700 ml-5 mb-2">
          Posts/captions and hashtags are AI-generated based on the source platform&apos;s caption (not the actual video) and only applied to auto-published content. They may not always be accurate. Use at your own risk.
        </p>
        <div className="flex text-sm mb-1">
          <span className="font-medium w-32">Environment</span>
          <span className="text-gray-400">None</span>
        </div>
      </div>
      {/* Linked work items */}
      <div className="mb-4">
        <h2 className="text-base font-semibold mb-1">Linked work items</h2>
        <div className="flex items-center text-xs">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded border border-gray-300 mr-2">ATRE-9 ChatGPT - Auto rewrite descriptions and add hashtags [Frill Idea]</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-semibold mr-2">IN PRODUCT RE...</span>
          <span className="text-yellow-500 mr-1">=</span>
        </div>
      </div>
      {/* Activity Tabs */}
      <div className="mb-2 border-b border-gray-200 flex items-center">
        <button className="px-3 py-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-500">All</button>
        <button className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Comments</button>
        <button className="px-3 py-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-500">History</button>
        <button className="px-3 py-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-500">Work log</button>
        <button className="px-3 py-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-500">Checklist history</button>
        <div className="flex-1" />
      </div>
      {/* Add a comment */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded border border-gray-300">😊 Looks good!</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded border border-gray-300">❓ Need help?</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded border border-gray-300">⛔ This is blocked...</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded border border-gray-300">🔍 Can you clarify...?</span>
          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded border border-green-300">✅ This is on track</span>
        </div>
        <input className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-1" placeholder="Add a comment..." disabled value="" />
        <div className="text-xs text-gray-400">Pro tip: press <span className="font-mono bg-gray-100 px-1 rounded">M</span> to comment</div>
      </div>
      {/* Comments */}
      <div className="space-y-6">
        {/* Comment 1 */}
        <div className="flex items-start space-x-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">DD</span>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-sm">Dharmesh Dakhra</span>
              <span className="text-xs text-gray-400">6 hours ago</span>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-2 text-xs mb-1">
              <span className="block text-blue-700 underline">https://github.com/Repurpose-io/smp/pull/1995</span> Connect your Github account ，<br/>
              <span className="block text-blue-700 underline">https://github.com/Repurpose-io/smpnode/pull/831</span> Connect your Github account
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>↩️</span>
              <span>💬</span>
              <span>🔗</span>
              <span>⋯</span>
            </div>
          </div>
        </div>
        {/* Comment 2 */}
        <div className="flex items-start space-x-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">A</span>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-sm">Avish</span>
              <span className="text-xs text-gray-400">7 hours ago (edited)</span>
            </div>
            <div className="text-xs mb-1">
              Use AI to auto-generate posts/captions and hashtags for auto-published content
              <div className="flex items-center mt-1">
                <span className="text-yellow-500 mr-1">⚠️</span>
                <span className="font-semibold">Warning Text:</span>
              </div>
              <div className="ml-5">
                Posts/captions and hashtags are AI-generated based on the source platform&apos;s caption (not the actual video) and only applied to auto-published content. They may not always be accurate. Use at your own risk.
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>@Dharmesh</span>
              <span>👍 1</span>
              <span>💬</span>
              <span>⋯</span>
            </div>
          </div>
        </div>
        {/* Comment 3 */}
        <div className="flex items-start space-x-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">DD</span>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-sm">Dharmesh Dakhra</span>
              <span className="text-xs text-gray-400">7 hours ago</span>
            </div>
            <div className="text-xs mb-1">
              <span className="text-blue-700 font-semibold">@Sagar Jaid</span> <span className="text-gray-700">@Avish Could you please let me know what title and warning text should be added for this</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>↩️</span>
              <span>💬</span>
              <span>🔗</span>
              <span>⋯</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



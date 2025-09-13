import React from "react";

export default function Jira() {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-6 text-gray-900 shadow-sm">
      {/* Header */}
      <div className="mb-2 flex items-center space-x-2 text-xs">
        <span className="font-semibold text-purple-700">ATRE-5</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-700">ATRE-160</span>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Make Auto rewrite visible for auto and manual both
        </h1>
        <div className="flex space-x-2">
          <button className="rounded border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium">
            + Add
          </button>
          <button className="rounded border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium">
            Apps
          </button>
        </div>
      </div>
      {/* Description */}
      <div className="mb-4">
        <h2 className="mb-1 text-base font-semibold">Description</h2>
        <p className="mb-2 text-sm">
          Use AI to auto-generate posts/captions and hashtags for auto-published
          content
        </p>
        <div className="mb-1 flex items-center">
          <span className="mr-1 text-yellow-500">⚠️</span>
          <span className="text-sm font-semibold">Warning Text:</span>
        </div>
        <p className="mb-2 ml-5 text-xs text-gray-700">
          Posts/captions and hashtags are AI-generated based on the source
          platform&apos;s caption (not the actual video) and only applied to
          auto-published content. They may not always be accurate. Use at your
          own risk.
        </p>
        <div className="mb-1 flex text-sm">
          <span className="w-32 font-medium">Environment</span>
          <span className="text-gray-400">None</span>
        </div>
      </div>
      {/* Linked work items */}
      <div className="mb-4">
        <h2 className="mb-1 text-base font-semibold">Linked work items</h2>
        <div className="flex items-center text-xs">
          <span className="mr-2 rounded border border-gray-300 bg-gray-100 px-2 py-0.5 text-gray-800">
            ATRE-9 ChatGPT - Auto rewrite descriptions and add hashtags [Frill
            Idea]
          </span>
          <span className="mr-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
            IN PRODUCT RE...
          </span>
          <span className="mr-1 text-yellow-500">=</span>
        </div>
      </div>
      {/* Activity Tabs */}
      <div className="mb-2 flex items-center border-b border-gray-200">
        <button className="border-b-2 border-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-500">
          All
        </button>
        <button className="border-b-2 border-blue-600 px-3 py-2 text-sm font-medium text-blue-600">
          Comments
        </button>
        <button className="border-b-2 border-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-500">
          History
        </button>
        <button className="border-b-2 border-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-500">
          Work log
        </button>
        <button className="border-b-2 border-transparent px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-500">
          Checklist history
        </button>
        <div className="flex-1" />
      </div>
      {/* Add a comment */}
      <div className="mb-4">
        <div className="mb-2 flex items-center space-x-2">
          <span className="rounded border border-gray-300 bg-gray-100 px-2 py-0.5 text-xs">
            😊 Looks good!
          </span>
          <span className="rounded border border-gray-300 bg-gray-100 px-2 py-0.5 text-xs">
            ❓ Need help?
          </span>
          <span className="rounded border border-gray-300 bg-gray-100 px-2 py-0.5 text-xs">
            ⛔ This is blocked...
          </span>
          <span className="rounded border border-gray-300 bg-gray-100 px-2 py-0.5 text-xs">
            🔍 Can you clarify...?
          </span>
          <span className="rounded border border-green-300 bg-green-100 px-2 py-0.5 text-xs text-green-800">
            ✅ This is on track
          </span>
        </div>
        <input
          className="mb-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          placeholder="Add a comment..."
          disabled
          value=""
        />
        <div className="text-xs text-gray-400">
          Pro tip: press{" "}
          <span className="rounded bg-gray-100 px-1 font-mono">M</span> to
          comment
        </div>
      </div>
      {/* Comments */}
      <div className="space-y-6">
        {/* Comment 1 */}
        <div className="flex items-start space-x-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
            DD
          </span>
          <div className="flex-1">
            <div className="mb-1 flex items-center space-x-2">
              <span className="text-sm font-semibold">Dharmesh Dakhra</span>
              <span className="text-xs text-gray-400">6 hours ago</span>
            </div>
            <div className="mb-1 rounded border border-gray-200 bg-gray-50 p-2 text-xs">
              <span className="block text-blue-700 underline">
                https://github.com/Repurpose-io/smp/pull/1995
              </span>{" "}
              Connect your Github account ，<br />
              <span className="block text-blue-700 underline">
                https://github.com/Repurpose-io/smpnode/pull/831
              </span>{" "}
              Connect your Github account
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
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-yellow-100 text-sm font-bold text-yellow-700">
            A
          </span>
          <div className="flex-1">
            <div className="mb-1 flex items-center space-x-2">
              <span className="text-sm font-semibold">Avish</span>
              <span className="text-xs text-gray-400">
                7 hours ago (edited)
              </span>
            </div>
            <div className="mb-1 text-xs">
              Use AI to auto-generate posts/captions and hashtags for
              auto-published content
              <div className="mt-1 flex items-center">
                <span className="mr-1 text-yellow-500">⚠️</span>
                <span className="font-semibold">Warning Text:</span>
              </div>
              <div className="ml-5">
                Posts/captions and hashtags are AI-generated based on the source
                platform&apos;s caption (not the actual video) and only applied
                to auto-published content. They may not always be accurate. Use
                at your own risk.
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
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
            DD
          </span>
          <div className="flex-1">
            <div className="mb-1 flex items-center space-x-2">
              <span className="text-sm font-semibold">Dharmesh Dakhra</span>
              <span className="text-xs text-gray-400">7 hours ago</span>
            </div>
            <div className="mb-1 text-xs">
              <span className="font-semibold text-blue-700">@Sagar Jaid</span>{" "}
              <span className="text-gray-700">
                @Avish Could you please let me know what title and warning text
                should be added for this
              </span>
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

import React from "react";

interface DetailsPanelProps {
  summaryTitle?: string;
  summaryIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  sprint?: string;
  fixVersion?: string;
  parent?: string;
}

/**
 * Highly reusable details panel component matching the Figma design.
 * - Responsive, no hardcoded pixel widths
 * - Accepts summary (title, icon) and children for flexible content
 */
export default function DetailsPanel({
  summaryTitle = "Details",
  summaryIcon,
  children,
  className = "",
  sprint,
  fixVersion,
  parent,
}: DetailsPanelProps) {
  return (
    <div
      className={`mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg ${className}`}
    >
      {/* Summary/Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-white to-blue-50 px-6 py-4">
        <div className="flex items-center gap-2">
          {summaryIcon && <span className="text-blue-500">{summaryIcon}</span>}
          <span className="text-lg font-bold text-blue-700 md:text-xl">
            {summaryTitle}
          </span>
        </div>
        {/* Example: Chevron or menu icon slot */}
        <span className="text-gray-400">
          {/** Optionally pass an icon here */}
        </span>
      </div>
      {/* Main content */}
      <div className="flex flex-col flex-wrap gap-4 bg-white p-6 md:flex-row">
        {children}
        {/* New fields section */}
        <div className="mt-4 w-full">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/** Sprint */}
            {sprint && (
              <div>
                <div className="mb-1 text-xs font-medium text-gray-500">
                  Sprint
                </div>
                <div className="text-sm font-semibold text-blue-700">
                  {sprint}
                </div>
              </div>
            )}
            {/** Fix Version */}
            {fixVersion && (
              <div>
                <div className="mb-1 text-xs font-medium text-gray-500">
                  Fix versions
                </div>
                <div className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                  {fixVersion}
                </div>
              </div>
            )}
            {/** Parent */}
            {parent && (
              <div>
                <div className="mb-1 text-xs font-medium text-gray-500">
                  Parent
                </div>
                <div className="inline-flex items-center gap-1 rounded bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-800">
                  <svg
                    className="h-3 w-3 text-purple-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.293 2.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-9 9a1 1 0 01-.293.207l-4 2a1 1 0 01-1.316-1.316l2-4a1 1 0 01.207-.293l9-9z"></path>
                  </svg>
                  {parent}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

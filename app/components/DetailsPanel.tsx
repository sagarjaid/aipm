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
      className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden w-full max-w-3xl mx-auto ${className}`}
    >
      {/* Summary/Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-white to-blue-50">
        <div className="flex items-center gap-2">
          {summaryIcon && <span className="text-blue-500">{summaryIcon}</span>}
          <span className="text-lg md:text-xl font-bold text-blue-700">{summaryTitle}</span>
        </div>
        {/* Example: Chevron or menu icon slot */}
        <span className="text-gray-400">{/** Optionally pass an icon here */}</span>
      </div>
      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 p-6 bg-white">
        {children}
        {/* New fields section */}
        <div className="w-full mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/** Sprint */}
            {sprint && (
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Sprint</div>
                <div className="text-sm font-semibold text-blue-700">{sprint}</div>
              </div>
            )}
            {/** Fix Version */}
            {fixVersion && (
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Fix versions</div>
                <div className="inline-block bg-gray-100 text-xs font-semibold text-gray-700 rounded px-2 py-0.5">{fixVersion}</div>
              </div>
            )}
            {/** Parent */}
            {parent && (
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Parent</div>
                <div className="inline-flex items-center gap-1 bg-purple-100 text-xs font-semibold text-purple-800 rounded px-2 py-0.5">
                  <svg className="w-3 h-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M13.293 2.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-9 9a1 1 0 01-.293.207l-4 2a1 1 0 01-1.316-1.316l2-4a1 1 0 01.207-.293l9-9z"></path></svg>
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
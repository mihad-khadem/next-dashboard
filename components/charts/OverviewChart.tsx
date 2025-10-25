import React from "react";

export default function OverviewChart({
  className = "",
}: {
  className?: string;
}) {
  // Simple placeholder chart using SVG
  return (
    <div className={"bg-white rounded shadow p-4 " + className}>
      <div className="text-sm font-medium mb-2">Overview</div>
      <svg
        width="100%"
        height="80"
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          points="0,60 30,40 60,50 90,20 120,30 150,10 180,30 200,20"
        />
      </svg>
    </div>
  );
}

import React from "react";
import Skeleton from "@/components/ui/Skeleton";

type ChartData = {
  labels: string[];
  data: number[];
};

export default function OverviewChart({
  className = "",
  loading = false,
  data,
}: {
  className?: string;
  loading?: boolean;
  data?: ChartData;
}) {
  // Calculate points for the SVG polyline
  const points = data
    ? data.data
        .map((value, index) => {
          const x = (index / (data.data.length - 1)) * 200;
          const y = 80 - (value / Math.max(...data.data)) * 60;
          return `${x},${y}`;
        })
        .join(" ")
    : "0,60 30,40 60,50 90,20 120,30 150,10 180,30 200,20";

  return (
    <div
      className={
        "bg-white rounded shadow p-4 transition-all duration-300 " + className
      }
    >
      <div className="text-sm font-medium mb-2">Overview</div>
      {loading ? (
        <Skeleton height={80} width="100%" />
      ) : (
        <>
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
              points={points}
            />
          </svg>
          {data && (
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              {data.labels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

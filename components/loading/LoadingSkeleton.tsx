"use client";

import { Card, Skeleton } from "antd";

interface LoadingSkeletonProps {
  type?: "table" | "form" | "card";
  rows?: number;
}

export function LoadingSkeleton({
  type = "table",
  rows = 5,
}: LoadingSkeletonProps) {
  if (type === "table") {
    return (
      <Card>
        <Skeleton active paragraph={{ rows: 0 }} />
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton
            key={index}
            active
            paragraph={{ rows: 0 }}
            className="mt-4"
          />
        ))}
      </Card>
    );
  }

  if (type === "form") {
    return (
      <Card>
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="mb-4">
            <Skeleton.Input
              active
              size="small"
              className="mb-1"
              style={{ width: 100 }}
            />
            <Skeleton.Input active block />
          </div>
        ))}
      </Card>
    );
  }

  if (type === "card") {
    return (
      <Card>
        <Skeleton active avatar paragraph={{ rows: 2 }} />
      </Card>
    );
  }

  return <Skeleton active />;
}

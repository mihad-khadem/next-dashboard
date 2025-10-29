import React from "react";
import Skeleton from "@/components/ui/Skeleton";

type StatWidgetProps = {
  title: string;
  value: string | number;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
};

export default function StatWidget({
  title,
  value,
  className = "",
  children,
  loading = false,
}: StatWidgetProps) {
  return (
    <div
      className={
        "bg-white rounded p-4 shadow transition-all duration-300 hover:shadow-lg " +
        className
      }
    >
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">
        {loading ? <Skeleton height={"32"} width={"80"} /> : value}
      </div>
      {children}
    </div>
  );
}

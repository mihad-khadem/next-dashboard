import React from "react";

type StatWidgetProps = {
  title: string;
  value: string | number;
  className?: string;
  children?: React.ReactNode;
};

export default function StatWidget({
  title,
  value,
  className = "",
  children,
}: StatWidgetProps) {
  return (
    <div className={"bg-white rounded p-4 shadow " + className}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {children}
    </div>
  );
}

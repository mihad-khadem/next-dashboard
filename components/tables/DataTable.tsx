"use client";

import React from "react";
import Skeleton from "@/components/ui/Skeleton";

type Column<T> = {
  key: string;
  title: string;
  render?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  loading?: boolean;
};

export default function DataTable<T>({
  data,
  columns,
  className = "",
  loading = false,
}: DataTableProps<T>) {
  return (
    <div
      className={
        "overflow-auto bg-white rounded shadow transition-all duration-300 " +
        className
      }
    >
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left p-2 text-sm text-gray-600">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t">
                  {columns.map((col) => (
                    <td key={col.key} className="p-2 text-sm">
                      <Skeleton
                        height={18}
                        width={col.key === "actions" ? 60 : 100}
                      />
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row, i) => (
                <tr key={i} className="border-t">
                  {columns.map((col) => (
                    <td key={col.key} className="p-2 text-sm">
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

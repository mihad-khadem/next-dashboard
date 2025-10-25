"use client";

import React from "react";

type Column<T> = {
  key: string;
  title: string;
  render?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
};

export default function DataTable<T>({
  data,
  columns,
  className = "",
}: DataTableProps<T>) {
  return (
    <div className={"overflow-auto bg-white rounded shadow " + className}>
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
          {data.map((row, i) => (
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

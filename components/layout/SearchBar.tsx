"use client";

import { Input, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const mockData = [
  { value: "Users", category: "Navigation" },
  { value: "Products", category: "Navigation" },
  { value: "Reports", category: "Navigation" },
  { value: "Monthly Revenue Report", category: "Documents" },
  { value: "Quarterly Sales Analysis", category: "Documents" },
  { value: "Customer Feedback Summary", category: "Documents" },
];

export default function SearchBar() {
  const [options, setOptions] = useState<
    { label: React.ReactNode; value: string }[]
  >([]);

  const handleSearch = (value: string) => {
    const searchResults = mockData
      .filter((item) => item.value.toLowerCase().includes(value.toLowerCase()))
      .map((item) => ({
        label: (
          <div className="flex flex-col">
            <span>{item.value}</span>
            <span className="text-xs text-gray-500">{item.category}</span>
          </div>
        ),
        value: item.value,
      }));

    setOptions(searchResults);
  };

  return (
    <div className="w-64">
      <AutoComplete
        options={options}
        onSearch={handleSearch}
        className="w-full"
      >
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="rounded-lg"
        />
      </AutoComplete>
    </div>
  );
}

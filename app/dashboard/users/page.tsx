import React from "react";
import Card from "@/components/ui/Card";
import DataTable from "@/components/tables/DataTable";

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

export default function UsersPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <Card>
        <DataTable
          data={users}
          columns={[
            { key: "id", title: "ID" },
            { key: "name", title: "Name" },
            { key: "email", title: "Email" },
          ]}
        />
      </Card>
    </div>
  );
}

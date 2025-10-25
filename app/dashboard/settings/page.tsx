import React from "react";
import Card from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <Card>
        <p className="text-gray-600">
          Application and user settings will appear here.
        </p>
      </Card>
    </div>
  );
}

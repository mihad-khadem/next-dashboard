import React from "react";
import Card from "@/components/ui/Card";
import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <StatWidget title="Total Products" value={128} />
        <StatWidget title="Active" value={102} />
        <StatWidget title="Out of stock" value={26} />
      </div>

      <Card>
        <OverviewChart />
      </Card>
    </div>
  );
}

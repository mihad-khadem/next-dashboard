"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import { dashboardStats, salesData, topProducts } from "@/lib/data/mockData";

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const { productStats } = dashboardStats;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatWidget
          title="Total Products"
          value={productStats.total}
          loading={loading}
        />
        <StatWidget
          title="Active Products"
          value={productStats.active}
          loading={loading}
        />
        <StatWidget
          title="Low Stock"
          value={productStats.lowStock}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card title="Product Sales Trend">
          <OverviewChart
            className="h-[300px]"
            loading={loading}
            data={salesData.weekly}
          />
        </Card>
        <Card title="Top Products">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      {product.sales} sales
                    </div>
                  </div>
                  <div className="font-medium">
                    ${product.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

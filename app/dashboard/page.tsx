"use client";
import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import Card from "@/components/ui/Card";
import { useState, useEffect } from "react";
import { dashboardStats, salesData } from "@/lib/data/mockData";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const { todayStats, revenueStats, productStats, userStats } = dashboardStats;
  const stats = [
    {
      title: "Total Revenue",
      value: revenueStats.total,
      change: revenueStats.growth,
    },
    {
      title: "Active Users",
      value: userStats.active.toString(),
      change: `+${((userStats.new / userStats.total) * 100).toFixed(1)}%`,
    },
    {
      title: "Total Orders",
      value: todayStats.totalOrders.toString(),
      change: "+8.4%",
    },
    {
      title: "Total Products",
      value: productStats.total.toString(),
      change: `${((productStats.active / productStats.total) * 100).toFixed(
        1
      )}% active`,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Enterprise Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatWidget
            key={index}
            title={stat.title}
            value={stat.value}
            className="relative overflow-hidden"
            loading={loading}
          >
            {!loading && (
              <span className="absolute top-2 right-2 text-sm font-medium text-green-600">
                {stat.change}
              </span>
            )}
          </StatWidget>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Revenue Overview">
          <OverviewChart
            className="h-[300px]"
            loading={loading}
            data={salesData.monthly}
          />
        </Card>
        <Card title="User Activity">
          <OverviewChart
            className="h-[300px]"
            loading={loading}
            data={salesData.daily}
          />
        </Card>
      </div>
    </div>
  );
}

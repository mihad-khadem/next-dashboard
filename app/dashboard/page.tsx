import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import Card from "@/components/ui/Card";

const stats = [
  {
    title: "Total Revenue",
    value: "$54,375",
    change: "+14.5%",
  },
  {
    title: "Active Users",
    value: "2,345",
    change: "+5.6%",
  },
  {
    title: "Total Orders",
    value: "1,247",
    change: "+2.4%",
  },
  {
    title: "Total Products",
    value: "450",
    change: "+8.2%",
  },
];

export default function DashboardPage() {
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
          >
            <span className="absolute top-2 right-2 text-sm font-medium text-green-600">
              {stat.change}
            </span>
          </StatWidget>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Revenue Overview">
          <OverviewChart className="h-[300px]" />
        </Card>
        <Card title="User Activity">
          <OverviewChart className="h-[300px]" />
        </Card>
      </div>
    </div>
  );
}

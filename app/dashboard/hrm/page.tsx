import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import Card from "@/components/ui/Card";

export default function HRMPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">HRM</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget title="Employees" value="124" />
        <StatWidget title="On Leave" value="3" />
        <StatWidget title="Open Positions" value="6" />
        <StatWidget title="Avg. Tenure" value="2.3 yrs" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Attendance Trend">
          <OverviewChart className="h-[260px]" />
        </Card>
        <Card title="Hiring Funnel">
          <OverviewChart className="h-[260px]" />
        </Card>
      </div>
    </div>
  );
}

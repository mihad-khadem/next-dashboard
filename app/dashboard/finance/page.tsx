import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import Card from "@/components/ui/Card";

export default function FinancePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Finance</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget title="Revenue" value="$124,230" />
        <StatWidget title="Expenses" value="$34,120" />
        <StatWidget title="Net Profit" value="$90,110" />
        <StatWidget title="Cash in Hand" value="$12,450" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Cash Flow">
          <OverviewChart className="h-[260px]" />
        </Card>
        <Card title="Profit & Loss">
          <OverviewChart className="h-[260px]" />
        </Card>
      </div>
    </div>
  );
}

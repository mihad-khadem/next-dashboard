import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import Card from "@/components/ui/Card";

export default function PromotionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Promotions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget title="Active Campaigns" value="5" />
        <StatWidget title="Total Coupons" value="120" />
        <StatWidget title="Redemptions" value="320" />
        <StatWidget title="ROI" value="3.8x" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Campaign Performance">
          <OverviewChart className="h-[260px]" />
        </Card>
        <Card title="Coupon Usage">
          <OverviewChart className="h-[260px]" />
        </Card>
      </div>
    </div>
  );
}

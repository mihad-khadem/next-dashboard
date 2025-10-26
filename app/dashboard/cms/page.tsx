import StatWidget from "@/components/widgets/StatWidget";
import OverviewChart from "@/components/charts/OverviewChart";
import Card from "@/components/ui/Card";

export default function CMSPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">CMS</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <StatWidget title="Pages" value="32" />
        <StatWidget title="Blog Posts" value="128" />
        <StatWidget title="Drafts" value="4" />
        <StatWidget title="Traffic" value="12.4k" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Content Performance">
          <OverviewChart className="h-[260px]" />
        </Card>
        <Card title="Top Posts">
          <OverviewChart className="h-[260px]" />
        </Card>
      </div>
    </div>
  );
}

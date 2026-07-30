import { BaseCard } from "@/components/base-card/base-card";
import { ContentStatus } from "@/types/content-status/content-status";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
type DountChartProps = {
  stat: DountChartData;
  name: string;
};

export function DountChart({ stat, name }: DountChartProps) {
  const STATUS_COLORS: Record<string, string> = {
    favorite: "#FF6787",
    in_progress: "#FFC766",
    planning: "#9A99F4",
    completed: "#87D68D", // "#B3FFFC",
    dropped: "#483C46", //"#373F51", #515053
  };
  return (
    <BaseCard className="w-[207px] h-[228px] rounded-[55px] pt-8">
      <h4 className="text-center text-[#222F3E] text-[26px] font-extrabold">
        {name}
      </h4>
      <div className="h-30">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={stat.data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={30}
              labelLine={false}
              stroke="none"
              shape={(props) => (
                <Sector {...props} fill={STATUS_COLORS[props.name ?? ""]} />
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </BaseCard>
  );
}

import { BaseCard } from "@/components/base-card/base-card";
import { SpringAnime } from "@/components/animations/spring-anim/spring-anim";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { STATUS_COLORS } from "@/types/content-status/status-colors";
type DountChartProps = {
  stat: DountChartData;
  name: string;
};

export function DountChart({ stat, name }: DountChartProps) {
  return (
    <SpringAnime>
      <BaseCard className="w-[300px] mr-2 second:w-[207px] h-[228px] rounded-[55px] pt-7">
        <h4 className="text-center text-[#222F3E] text-[26px] font-extrabold mb-2">
          {name}
        </h4>
        <div className="h-30">
          {stat?.data.length === 0 ? (
            <div className="h-full flex justify-center items-center">
              Данных нет
            </div>
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={stat?.data ?? []}
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
          )}
        </div>
      </BaseCard>
    </SpringAnime>
  );
}

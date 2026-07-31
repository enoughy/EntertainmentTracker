import { BaseCard } from "@/components/base-card/base-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

type BarChartData = { mount: string; value: number }[];

const data: BarChartData = [
  { mount: "Jan", value: 40 },
  { mount: "Feb", value: 140 },
  { mount: "Mar", value: 30 },
  { mount: "Apr", value: 80 },
  { mount: "Jun", value: 40 },
];
const colorStart = "#5570F1";
const colorStop = "#002CFF";

export function BarChartComp() {
  return (
    <BaseCard className="max-w-[326px] h-[317px] pt-10">
      <div className="flex justify-between items-center">
        <h4 className="text-[#29292C] text-[24px]">Добавлено</h4>
        <span className="text-[#898989] text-[18px]">Jan - Jun</span>
      </div>
      <BarChart
        className="mt-[35px] h-55 max-h-[202px]"
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient key="key1" id={`id1`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor={colorStart} stopOpacity={0.4} />
            <stop offset="95%" stopColor={colorStop} stopOpacity={0.4} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} strokeDasharray="8 8" opacity={0.6} />
        <XAxis dataKey="mount" />
        <YAxis width="auto" />
        <Tooltip cursor={false} />
        <Bar
          dataKey="value"
          fill="url(#id1)"
          activeBar={{ fill: colorStart }}
          radius={[4, 4, 0, 0]}
          barSize={20}
        />
      </BarChart>
    </BaseCard>
  );
}

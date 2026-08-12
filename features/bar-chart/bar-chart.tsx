import { BaseCard } from "@/components/base-card/base-card";
import { StatusCard } from "@/components/status-card/status-card";
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

export type BarChartData = { mount: string; value: number }[];

type BarChartProps = {
  data: BarChartData;
};

const colorStart = "#5570F1";
const colorStop = "#002CFF";

export function BarChartComp({ data }: BarChartProps) {
  return (
    <BaseCard className="w-full second:max-w-[326px] pt-8 pb-2">
      <div className="flex justify-between items-center">
        <h4 className="text-[#29292C] text-[20px]">Добавлено</h4>

        <span className="text-[#898989] text-[15px]">
          {data[-1] === undefined ? "" : data[0].mount + " - " + data[-1].mount}
        </span>
      </div>
      <BarChart
        className="mt-[28px] h-48 "
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

        <CartesianGrid vertical={false} strokeDasharray="8 8" opacity={0.4} />
        <XAxis tick={{ fontSize: 12 }} interval={0} dataKey="mount" />
        <YAxis tick={{ fontSize: 12 }} width="auto" />
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

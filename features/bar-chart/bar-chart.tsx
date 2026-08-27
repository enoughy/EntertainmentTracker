import { BaseCard } from "@/components/base-card/base-card";
import { UpAnim } from "@/components/animations/up-anim/up-anim";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export type BarChartData = { mount: string; value: number }[];

type BarChartProps = {
  data: BarChartData;
};

export function BarChartComp({ data }: BarChartProps) {
  return (
    <UpAnim className="h-full">
      <BaseCard className="w-full second:max-w-[326px] h-full pt-8 pb-2 dark:bg-[#484b4f]">
        <div className="flex justify-between items-center">
          <h4 className="text-[#29292C] text-[20px] dark:text-[rgba(255,255,255,0.8)]">Добавлено</h4>
          <span className="text-[#898989] text-[17px] dark:text-[rgba(255,255,255,0.6)]">
            {data.at(-1) == null
              ? ""
              : data[0].mount + " - " + data.at(-1)!.mount}
          </span>
        </div>
        <BarChart
          className="mt-7 h-48 "
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
              <stop
                offset="5%"
                stopColor="var(--color-primary-second)"
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor="var(--color-primary-first)"
                stopOpacity={0.4}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="8 8" opacity={0.4} />
          <XAxis tick={{ fontSize: 12 }} interval={0} dataKey="mount" />
          <YAxis tick={{ fontSize: 12 }} width="auto" />
          <Tooltip cursor={false} />
          <Bar
            dataKey="value"
            fill="url(#id1)"
            activeBar={{ fill: "var(--color-primary-first)" }}
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </BaseCard>
    </UpAnim>
  );
}

import { Header } from "./header";
import { DountChart } from "../dount-chart/dount-chart";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";

type DountChartContainerProps = {
  data: DountChartData[];
};

export function DountChartContainer({ data }: DountChartContainerProps) {
  return (
    <div className="max-w-[656px]">
      <Header className="mb-5"></Header>
      <div className="flex items-center justify-between">
        <DountChart name="Фильмы" stat={data[0]}></DountChart>
        <DountChart name="Фильмы" stat={data[0]}></DountChart>
        <DountChart name="Фильмы" stat={data[0]}></DountChart>
      </div>
    </div>
  );
}

import { Header } from "./header";
import { DountChart } from "../dount-chart/dount-chart";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { UpAnim } from "@/components/animations/up-anim/up-anim";

type DountChartContainerProps = {
  data: DountChartData[];
};

export function DountChartContainer({ data }: DountChartContainerProps) {
  return (
    <div className="w-full second:max-w-[656px]">
      <UpAnim>
        <Header className="mb-5"></Header>
      </UpAnim>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <DountChart name="Аниме" stat={data[0]}></DountChart>
        <DountChart name="Сериалы" stat={data[1]}></DountChart>
        <DountChart name="Фильмы" stat={data[2]}></DountChart>
      </div>
    </div>
  );
}

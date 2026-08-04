import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { MediaBlock } from "../content/entity/mediaBlock";

export function dountChartMapper(mb: MediaBlock): DountChartData {
  const chartData: DountChartData = { data: [] };
  for (let [k, v] of mb.contentStatusStatistic) {
    chartData.data.push({ name: k, value: v });
    console.log("iter");
    console.log(chartData);
  }
  return chartData;
}

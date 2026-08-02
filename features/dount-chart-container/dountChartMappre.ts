import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { MediaBlock } from "@/types/entitys/media";

export function dountChartMapper(mb: MediaBlock): DountChartData {
  const chartData: DountChartData = { data: [] };
  for (let [k, v] of mb.contentStatusStatistic) {
    chartData.data.push({ name: k, value: v });
  }
  return chartData;
}

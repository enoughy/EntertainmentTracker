import { Content } from "@/types/entitys/media";
import { BarChartData } from "./bar-chart";
import { MONTHS_MAP } from "@/types/months/months";

export function barChartDataMapper(content: Content): BarChartData {
  const systemMonthIndex: number = new Date().getMonth();
  const result: BarChartData = [];
  for (let i = systemMonthIndex - 5; i <= systemMonthIndex; i++) {
    result.push({
      mount: MONTHS_MAP[i],
      value: content?.countAddedInMonths?.get(MONTHS_MAP.at(i)!) ?? 0,
    });
    console.log(MONTHS_MAP.at(i));
  }
  console.log(result);
  return result;
}

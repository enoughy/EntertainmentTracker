import { MONTHS_MAP } from "@/types/date/months";
import { MediaBlock } from "../entity/mediaBlock";

export function procCalculate(item: MediaBlock): number {
  const currMonth = MONTHS_MAP.at(new Date().getMonth())!;
  const prevMonth = MONTHS_MAP.at(new Date().getMonth() - 1)!;
  const currVal = item.countAddedInMonths?.get(currMonth) ?? 0;
  const prevVal = item.countAddedInMonths?.get(prevMonth) ?? 0;
  const ret = ((currVal - prevVal) / prevVal) * 100;

  return Number.isFinite(ret) ? ret : 0;
}

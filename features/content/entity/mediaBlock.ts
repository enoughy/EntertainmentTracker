import { ContentType } from "@/types/content-type/contentType";
import { Media } from "./media";
import { Months } from "@/types/date/months";
import { ContentStatus } from "@/types/content-status/content-status";

export interface MediaBlock {
  readonly typeId: ContentType;
  id?: number;
  mediaList: Media[];
  count: number;
  countAddedInMonths: Map<Months, number>;
  contentStatusStatistic: Map<ContentStatus, number>;
}
export interface MediaBlockRecord {
  readonly typeId: ContentType;
  id?: number;
  mediaList: number[];
  count: number;
  countAddedInMonths: Map<Months, number>;
  contentStatusStatistic: Map<ContentStatus, number>;
}

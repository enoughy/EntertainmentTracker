import { ContentType } from "@/types/content-type/contentType";
import { Media } from "@/types/entitys/media";
import { Months } from "@/types/date/months";
import { ContentStatus } from "@/types/content-status/content-status";

export interface MediaBlock {
  readonly typeId: ContentType;
  mediaList: Media[];
  count: number;
  countAddedInMonths: Map<Months, number>;
  contentStatusStatistic: Map<ContentStatus, number>;
}

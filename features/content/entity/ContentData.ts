import { ContentType } from "@/types/content-type/contentType";
import { shiftBuff } from "@/features/content/adictStruct/shiftBuffer";
import { Media } from "./media";
import { Months } from "@/types/date/months";
import { MediaBlock } from "./mediaBlock";

export interface ContentData {
  content: Map<ContentType, MediaBlock>;
  addedRecently: shiftBuff<Media>;
  countAddedInMonths: Map<Months, number>;
}

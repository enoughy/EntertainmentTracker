import { ContentType } from "@/types/content-type/contentType";
import { shiftBuff } from "@/features/content/adictStruct/shiftBuffer";
import { Media } from "./media";
import { Months } from "@/types/date/months";
import { MediaBlock } from "./mediaBlock";

export interface ContentData {
  id: number;
  //content: Map<ContentType, MediaBlock>;
  addedRecently: shiftBuff<Media>;
  countAddedInMonths: Map<Months, number>;
}

export interface ContentDataRecord {
  id: number;
  addedRecently: shiftBuff<number>;
  countAddedInMonths: Map<Months, number>;
}

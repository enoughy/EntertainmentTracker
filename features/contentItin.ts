import { shiftBuff } from "@/adictStruct/shiftBuffer";
import { ContentData } from "./content/entity/ContentData";
import { MediaBlock } from "./content/entity/mediaBlock";

export function contentDataInit(): ContentData {
  const content: ContentData = {
    id: 0,
    addedRecently: new shiftBuff(),
    countAddedInMonths: new Map(),
  };
  return content;
}

export function MediaBlockInit(): MediaBlock[] {
  const anime: MediaBlock = {
    typeId: "anime",
    mediaList: [],
    count: 0,
    contentStatusStatistic: new Map(),
    countAddedInMonths: new Map(),
  };
  const film: MediaBlock = {
    typeId: "film",
    mediaList: [],
    count: 0,
    contentStatusStatistic: new Map(),
    countAddedInMonths: new Map(),
  };
  const series: MediaBlock = {
    typeId: "series",
    mediaList: [],
    count: 0,
    contentStatusStatistic: new Map(),
    countAddedInMonths: new Map(),
  };
  return [anime, film, series];
}

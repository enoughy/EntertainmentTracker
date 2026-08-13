import { shiftBuff } from "@/features/content/adictStruct/shiftBuffer";
import { ContentData } from "./content/entity/ContentData";
import { MediaBlock } from "./content/entity/mediaBlock";

export function contentDataInit(): ContentData {
  const content: ContentData = {
    content: new Map(),
    addedRecently: new shiftBuff(),
    countAddedInMonths: new Map(),
  };
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
  content.content.set("anime", anime);
  content.content.set("series", series);
  content.content.set("film", film);
  return content;
}

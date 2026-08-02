import { shiftBuff } from "@/adictStruct/shiftBuffer";
import { Anime, Content, ContentData, MediaBlock } from "@/types/entitys/media";

export function contentDataInit(): ContentData {
  const content: ContentData = {
    content: new Map(),
    addedRecently: new shiftBuff(),
  };
  const anime: MediaBlock = {
    typeId: "anime",
    mediaList: [],
    count: 0,
    contentStatusStatistic: new Map(),
    countOfAddInMounth: 0,
  };
  const film: MediaBlock = {
    typeId: "film",
    mediaList: [],
    count: 0,
    contentStatusStatistic: new Map(),
    countOfAddInMounth: 0,
  };
  const series: MediaBlock = {
    typeId: "series",
    mediaList: [],
    count: 0,
    contentStatusStatistic: new Map(),
    countOfAddInMounth: 0,
  };
  content.content.set("anime", anime);
  content.content.set("series", series);
  content.content.set("film", film);
  return content;
}

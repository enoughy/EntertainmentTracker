import { Media } from "../entity/media";
import { MediaBlock } from "../entity/mediaBlock";
import { ContentData } from "../entity/ContentData";
import { ContentType } from "@/types/content-type/contentType";
import { Months, MONTHS_MAP } from "@/types/date/months";
import { shiftBuff } from "@/adictStruct/shiftBuffer";

export function add(title: Media, data: ContentData): ContentData {
  let newContent: ContentData = { ...data };
  console.log("data");
  if (!newContent.content.has(title.contentType)) {
    const newMb: MediaBlock = {
      typeId: title.contentType,
      mediaList: [],
      count: 0,
      countAddedInMonths: new Map(),
      contentStatusStatistic: new Map(),
    };
    newContent = {
      ...newContent,
      content: new Map(data.content).set(title.contentType, newMb),
    };
  }

  const oldMb = newContent.content.get(title.contentType)!;

  const newCurrMb: MediaBlock = {
    ...oldMb,
    mediaList: [...oldMb.mediaList],
    countAddedInMonths: new Map(oldMb.countAddedInMonths),
    contentStatusStatistic: new Map(oldMb.contentStatusStatistic),
  };

  newCurrMb!.count!++;
  const countAddedInMonths =
    newCurrMb!.countAddedInMonths.get(MONTHS_MAP[title.dateOfAdd.getMonth()]) ??
    0;
  newCurrMb!.countAddedInMonths.set(
    MONTHS_MAP[title.dateOfAdd.getMonth()],
    countAddedInMonths + 1,
  );
  newCurrMb!.contentStatusStatistic.set(
    title.contentStatus,
    (newCurrMb!.contentStatusStatistic.get(title.contentStatus) ?? 0) + 1,
  );
  newCurrMb!.mediaList.push(title);

  newContent.content = new Map(newContent.content).set(
    title.contentType,
    newCurrMb,
  );

  newContent.addedRecently = new shiftBuff(newContent.addedRecently);
  newContent.addedRecently.push(title);

  const currentCountInMonth =
    newContent.countAddedInMonths.get(MONTHS_MAP[title.dateOfAdd.getMonth()]) ||
    0;

  newContent.countAddedInMonths = new Map(newContent.countAddedInMonths).set(
    MONTHS_MAP[title.dateOfAdd.getMonth()],
    currentCountInMonth + 1,
  );
  return newContent;
}
export function addMediaList(
  mdList: Media[],
  content: ContentData,
): ContentData {
  let newContent: ContentData = content;
  for (let md of mdList) {
    newContent = add(md, newContent);
  }
  return newContent;
}
export function getByType(
  key: ContentType,
  data: ContentData,
): MediaBlock | null {
  return data.content.get(key) ?? null;
}
export function getAddedRecently(data: ContentData): Media[] {
  return data.addedRecently.getValues();
}
export function getMediaBlocks(data: ContentData): MediaBlock[] {
  return Array.from(data.content.values());
}

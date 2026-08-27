import { Media } from "../entity/media";
import { MediaBlock } from "../entity/mediaBlock";
import { Months, MONTHS_MAP } from "@/types/date/months";
import { shiftBuff } from "@/features/content/adictStruct/shiftBuffer";
import * as mediaRepository from "../bd/mediaRepository";
import * as contentRepository from "../bd/contentRepository";
import * as mediaBlockRepository from "../bd/mediaBlockRepository";
import { contentDataInit } from "@/features/contentItin";
import { ContentData } from "../entity/ContentData";

export async function addMedia(title: Media) {
  let content: ContentData | undefined = await contentRepository.getContent();

  if (content == null) {
    content = contentDataInit();
  }

  content.addedRecently = new shiftBuff(content.addedRecently);

  let currentCountInMonth =
    content.countAddedInMonths.get(MONTHS_MAP[title.dateOfAdd.getMonth()]) || 0;
  content.countAddedInMonths.set(
    MONTHS_MAP[title.dateOfAdd.getMonth()],
    currentCountInMonth + 1,
  );

  let mb = await mediaBlockRepository.getMediaBlockByType(title.contentType);

  console.log("mb:");
  console.log(mb);
  if (mb == null) {
    mb = {
      typeId: title.contentType,
      mediaList: [],
      count: 0,
      countAddedInMonths: new Map(),
      contentStatusStatistic: new Map(),
    };
    console.log("create new mb");
  }
  currentCountInMonth =
    mb.countAddedInMonths.get(MONTHS_MAP[title.dateOfAdd.getMonth()]) || 0;

  mb.countAddedInMonths.set(
    MONTHS_MAP[title.dateOfAdd.getMonth()],
    currentCountInMonth + 1,
  );
  mb.count++;
  const mbCurrentStat = mb.contentStatusStatistic.get(title.contentStatus) || 0;
  mb.contentStatusStatistic.set(title.contentStatus, mbCurrentStat + 1);
  title.id = await mediaRepository.addMedia(title);

  content.addedRecently.push(title);

  contentRepository.storeContent(content);

  mb.mediaList.push(title);

  mediaBlockRepository.storeMediaBlock(mb);
}

export async function deleteMedia(id: number) {
  let title = await mediaRepository.getMediaById(id);
  if (title == null) {
    console.log("deleteMedia error title not in db");
    return;
  }
  let content: ContentData | undefined = await contentRepository.getContent();
  if (content == null) {
    console.log("deleteMedia error content is null");
    return;
  }

  let currentCountInMonth =
    content.countAddedInMonths.get(MONTHS_MAP[title.dateOfAdd.getMonth()]) || 0;
  content.countAddedInMonths.set(
    MONTHS_MAP[title.dateOfAdd.getMonth()],
    currentCountInMonth - 1,
  );

  content.addedRecently.buffer = content.addedRecently.buffer.filter(
    (md) => md.id != id,
  );

  contentRepository.storeContent(content);

  let mb = await mediaBlockRepository.getMediaBlockByType(title.contentType);

  currentCountInMonth =
    mb!.countAddedInMonths.get(MONTHS_MAP[title.dateOfAdd.getMonth()]) || 0;

  mb!.countAddedInMonths.set(
    MONTHS_MAP[title.dateOfAdd.getMonth()],
    currentCountInMonth - 1,
  );
  mb!.count--;
  const mbCurrentStat =
    mb!.contentStatusStatistic.get(title.contentStatus) || 0;
  mb!.contentStatusStatistic.set(title.contentStatus, mbCurrentStat - 1);

  mb!.mediaList = mb!.mediaList.filter((item) => item.id !== id);
  mediaBlockRepository.storeMediaBlock(mb!);
  mediaRepository.deleteMedia(id);
}

export async function changeMedia(id: number, newTitle: Media) {
  let title = await mediaRepository.getMediaById(id);
  if (title == null) {
    console.log("change media error this title dose not exist");
    return;
  }
  if (title.contentStatus !== newTitle.contentStatus) {
    const mb = await mediaBlockRepository.getMediaBlockByType(
      title.contentType,
    );
    const mbCurrentStat = mb!.contentStatusStatistic.get(title.contentStatus)!;
    mb!.contentStatusStatistic.set(title.contentStatus, mbCurrentStat - 1);

    const mbCurrentStatNew =
      mb!.contentStatusStatistic.get(title.contentStatus) || 0;
    mb!.contentStatusStatistic.set(
      newTitle.contentStatus,
      mbCurrentStatNew + 1,
    );
    console.log("store media block");
    mediaBlockRepository.storeMediaBlock(mb!);
  }
  title = { ...newTitle, id: title.id };
  console.log(title);
  await mediaRepository.addMedia(title);
}

export async function getMediaBlocks(): Promise<MediaBlock[] | undefined> {
  return mediaBlockRepository.getMediaBlockAll();
}

export async function getContent() {
  return contentRepository.getContent();
}
export async function addContent(content: ContentData) {
  contentRepository.storeContent(content);
}

import { ContentType } from "@/types/content-type/contentType";
import { MediaBlockRecord } from "../entity/mediaBlock";
import { MediaBlock } from "../entity/mediaBlock";
import { Media } from "../entity/media";
import { db } from "./bd";

async function mediaBlockMap(mb: MediaBlockRecord): Promise<MediaBlock> {
  const mbList = await db.media.where("id").anyOf(mb.mediaList).toArray();
  return {
    id: mb.id,
    typeId: mb.typeId,
    countAddedInMonths: mb.countAddedInMonths,
    contentStatusStatistic: mb.contentStatusStatistic,
    count: mb.count,
    mediaList: mbList,
  };
}

export async function getMediaBlockById(
  id: number,
): Promise<MediaBlock | undefined> {
  const mb = await db.mediaBlock.get(id);
  if (mb == null) {
    console.log("not found media block by id");
    return undefined;
  }
  return mediaBlockMap(mb);
}

export function storeMediaBlock(mb: MediaBlock) {
  console.log("store mb");
  console.log(mb);
  const mbrList = mb.mediaList.map((md) => md.id!);
  const mbr: MediaBlockRecord = {
    id: mb.id,
    typeId: mb.typeId,
    countAddedInMonths: mb.countAddedInMonths,
    contentStatusStatistic: mb.contentStatusStatistic,
    count: mb.count,
    mediaList: mbrList,
  };
  db.mediaBlock.put(mbr, mb.id);
}

export async function getMediaBlockByType(
  type: ContentType,
): Promise<MediaBlock | undefined> {
  const mb = await db.mediaBlock.where("typeId").equals(type).first();
  if (mb == null) {
    console.log("not found media block by type" + type);
    return undefined;
  }
  return mediaBlockMap(mb);
}

export async function getMediaBlockAll(): Promise<MediaBlock[] | undefined> {
  const mbList = await db.mediaBlock.toArray();
  return Promise.all(mbList.map(async (mb) => mediaBlockMap(mb)));
}

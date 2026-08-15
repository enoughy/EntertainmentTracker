import { shiftBuff } from "../adictStruct/shiftBuffer";
import { ContentData, ContentDataRecord } from "../entity/ContentData";
import { db } from "./bd";
import { Media } from "../entity/media";

export async function getContent(): Promise<ContentData | undefined> {
  const content = (await db.content.toArray())[0];
  if (content == null) {
    console.log("Not find media whith id");
    return undefined;
  }
  let mediaList: Media[] = [];
  if (content?.addedRecently != null) {
    mediaList = await db.media
      .where("id")
      .anyOf(content.addedRecently.buffer)
      .toArray();
  }

  return { ...content, addedRecently: new shiftBuff(undefined, mediaList) };
}
// all id in shiftBuffer list must be added
export function storeContent(item: ContentData) {
  console.log("store start");
  const idList = item.addedRecently.buffer.map((md) => md.id!);
  const contentDataRecord: ContentDataRecord = {
    ...item,
    addedRecently: new shiftBuff(undefined, idList),
  };
  db.content.put(contentDataRecord, item.id);
  console.log("content store");
}

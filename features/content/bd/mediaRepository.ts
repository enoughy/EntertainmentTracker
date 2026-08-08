import { Media } from "../entity/media";
import { db } from "./bd";

export async function getMediaById(id: number): Promise<Media | undefined> {
  const md: undefined | Media = await db.media.get(id);
  if (md == null) {
    console.log("Not find media whith id");
  }
  return md;
}

export function addMedia(md: Media) {
  return db.media.add(md, md.id);
}

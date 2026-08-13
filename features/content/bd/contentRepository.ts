import { ContentData } from "../entity/ContentData";
import { db } from "./bd";

export async function getContent(): Promise<ContentData | undefined> {
  const content = (await db.content.toArray())[0];
  if (content == null) {
    console.log("Not find media whith id");
  }

  return content;
}
export function storeContent(item: ContentData) {
  db.content.put(item, item.id);
}

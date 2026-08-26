import Dexie, { Table } from "dexie";
import { Media } from "../entity/media";
import { MediaBlockRecord } from "../entity/mediaBlock";
import { ContentDataRecord } from "../entity/ContentData";

export class AppDB extends Dexie {
  media!: Table<Media>;
  mediaBlock!: Table<MediaBlockRecord>;
  content!: Table<ContentDataRecord>;

  constructor() {
    super("AppDB");

    this.version(1).stores({
      media: "++id",
      mediaBlock: "++id, typeId",
      content: "id",
    });
  }
}

export const db = new AppDB();

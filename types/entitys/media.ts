import { shiftBuff } from "@/adictStruct/shiftBuffer";

export type Rate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ContentType = "anime" | "film" | "series" | "books";

export interface Media {
  name: string;
  genres: string[];
  rate: Rate;
  dateOfAdd: Date;
}

export interface Film extends Media {}
export interface Anime extends Media {}
export interface Books extends Media {}
export interface Siries extends Media {}

export interface MediaBlock {
  readonly typeId: ContentType;
  mediaList: Media[];
  count: number;
  countOfAddInMounth: number;
}

// object in bd
export class Content {
  content: Map<ContentType, MediaBlock> = new Map<ContentType, MediaBlock>();
  private addedRecently: shiftBuff<Media> = new shiftBuff<Media>();

  add(title: Media, type: ContentType) {
    if (!this.content.has(type)) {
      const newMb: MediaBlock = {
        typeId: type,
        mediaList: [],
        count: 0,
        countOfAddInMounth: 0,
      };
      this.content.set(type, newMb);
    }

    const currMb = this.content.get(type);
    currMb!.count++;
    currMb!.countOfAddInMounth++;
    currMb!.mediaList.push(title);

    this.addedRecently.push(title);
  }
  getByType(key: ContentType): MediaBlock | null {
    return this.content.get(key) ?? null;
  }
  getAddedRecently(): Media[] {
    return this.addedRecently.getValues();
  }
  getMediaBlocks(): MediaBlock[] {
    return Array.from(this.content.values());
  }
}

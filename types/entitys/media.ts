import { shiftBuff } from "@/adictStruct/shiftBuffer";
import { ContentStatus } from "../content-status/content-status";
import { Months, MONTHS_MAP } from "../date/months";

export interface Media {
  name: string;
  genres: string[];
  rate: Rate;
  contentStatus: ContentStatus;
  dateOfAdd: Date;
}

export interface Film extends Media {}
export interface Anime extends Media {}
export interface Siries extends Media {}

export interface MediaBlock {
  readonly typeId: ContentType;
  mediaList: Media[];
  count: number;
  countAddedInMonths: Map<Months, number>;
  contentStatusStatistic: Map<ContentStatus, number>;
}

// export interface ContentData {
//   content: Map<ContentType, MediaBlock>;
//   addedRecently: shiftBuff<Media>;
//   countAddedInMonths: Map<Months, number>;
// }

// object in bd
// export class Content implements ContentData {
//   content: Map<ContentType, MediaBlock>;
//   addedRecently: shiftBuff<Media>;
//   countAddedInMonths: Map<Months, number>;
//
//   constructor(data: ContentData) {
//     this.content = data.content;
//     this.addedRecently = data.addedRecently;
//     this.countAddedInMonths = data.countAddedInMonths;
//   }
//
//   add(title: Media, type: ContentType) {
//     if (!this.content.has(type)) {
//       const newMb: MediaBlock = {
//         typeId: type,
//         mediaList: [],
//         count: 0,
//         countAddedInMonths: new Map(),
//         contentStatusStatistic: new Map(),
//       };
//       this.content.set(type, newMb);
//     }
//
//     const currMb = this.content.get(type);
//     currMb!.count++;
//     const countAddedInMonths =
//       currMb!.countAddedInMonths.get(MONTHS_MAP[title.dateOfAdd.getMonth()]) ??
//       0;
//     currMb!.countAddedInMonths.set(
//       MONTHS_MAP[title.dateOfAdd.getMonth()],
//       countAddedInMonths + 1,
//     );
//     currMb!.contentStatusStatistic.set(
//       title.contentStatus,
//       (currMb!.contentStatusStatistic.get(title.contentStatus) ?? 0) + 1,
//     );
//     currMb!.mediaList.push(title);
//
//     this.addedRecently.push(title);
//     const currentCountInMonth =
//       this.countAddedInMonths.get(MONTHS_MAP[title.dateOfAdd.getDate()]) || 0;
//     this.countAddedInMonths.set(
//       MONTHS_MAP[title.dateOfAdd.getDate()],
//       currentCountInMonth + 1,
//     );
//   }
//   getByType(key: ContentType): MediaBlock | null {
//     return this.content.get(key) ?? null;
//   }
//   getAddedRecently(): Media[] {
//     return this.addedRecently.getValues();
//   }
//   getMediaBlocks(): MediaBlock[] {
//     return Array.from(this.content.values());
//   }
// }

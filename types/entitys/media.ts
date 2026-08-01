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
  typeId: ContentType;
  mediaList: Media[];
  count: number;
  countOfAddInMounth?: number;
}

// object in bd
export interface Content {
  content: Map<ContentType, MediaBlock>;
}

import { Rate } from "@/types/rate/rate";
import { ContentStatus } from "@/types/content-status/content-status";
import { ContentType } from "@/types/content-type/contentType";

export interface Media {
  name: string;
  genres: string[];
  imgFile?: File;
  rate: Rate;
  contentType: ContentType;
  contentStatus: ContentStatus;
  dateOfAdd: Date;
}

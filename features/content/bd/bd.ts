import { ContentData } from "../entity/ContentData";
import localforage from "localforage";

export function getContent(): Promise<ContentData | null> {
  return localforage.getItem<ContentData>("content");
}

export function storeContent(content: ContentData) {
  localforage.setItem("content", content);
}

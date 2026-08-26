import { useEffect, useState } from "react";
import { ContentData } from "../entity/ContentData";
import { contentDataInit, MediaBlockInit } from "@/features/contentItin";
import * as service from "../services/contentService";
import { Media } from "../entity/media";
import { MediaBlock } from "../entity/mediaBlock";
import { storeMediaBlock } from "../bd/mediaBlockRepository";

export function useContent() {
  const [content, setContent] = useState<ContentData | null>(contentDataInit());
  const [mediaBlocks, setMediaBlocks] = useState<MediaBlock[] | null>();
  /*if this funciton will use before init component => they may droped*/
  const addMedia = async (title: Media) => {
    if (content === null || content === undefined) {
      console.log("content is null || undef");
      return;
    }
    await service.addMedia(title);
    service.getMediaBlocks().then((mbList) => {
      setMediaBlocks(mbList);
    });
    service.getContent().then((content) => {
      setContent(content!);
    });
  };

  const getMediaBlocks = async () => {
    if (content === null || content === undefined) {
      console.log("content is null || undef");
      return;
    }
    return service.getMediaBlocks();
  };
  const deleteMedia = async (id: number) => {
    await service.deleteMedia(id);

    service.getMediaBlocks().then((mbList) => {
      setMediaBlocks(mbList);
    });
    service.getContent().then((content) => {
      setContent(content!);
    });
  };

  const changeMedia = async (id: number, title: Media) => {
    console.log("change media ()");
    console.log(title);
    await service.changeMedia(id, title);
    service.getMediaBlocks().then((mbList) => {
      setMediaBlocks(mbList);
    });
  };

  useEffect(() => {
    service.getMediaBlocks().then((mbList) => {
      if (mbList == null || mbList.length === 0) {
        mbList = MediaBlockInit();
        mbList.forEach((mb) => storeMediaBlock(mb));
      }
      setMediaBlocks(mbList);
    });
    service.getContent().then((content) => {
      if (content == null) {
        service.addContent(contentDataInit());
      }
      setContent(content ?? contentDataInit());
    });
  }, []);
  return {
    content,
    addMedia,
    deleteMedia,
    changeMedia,
    mediaBlocks,
    getMediaBlocks,
  };
}

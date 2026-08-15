import { useEffect, useState } from "react";
import { ContentData } from "../entity/ContentData";
import * as bd from "../bd/bd";
import { contentDataInit, MediaBlockInit } from "@/features/contentItin";
import * as service from "../services/contentService";
import { Media } from "../entity/media";
import { ContentType } from "@/types/content-type/contentType";
import localforage from "localforage";
import { MediaBlock } from "../entity/mediaBlock";
import { storeMediaBlock } from "../bd/mediaBlockRepository";

// const addMockMedias = (addMedia: any) => {
//     medias.forEach(addMedia);
// };
//
export function useContent() {
  const [content, setContent] = useState<ContentData | null>(contentDataInit());
  const [mediaBlocks, setMediaBlocks] = useState<MediaBlock[] | null>();

  // const load = (): Promise<ContentData | null> => {
  //   return bd.getContent();
  // };

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
  };

  // const getByType = (type: ContentType) => {
  //   if (content === null || content === undefined) {
  //     console.log("content is null || undef");
  //     return;
  //   }
  //   service.getByType(type, content);
  // };
  //
  const getMediaBlocks = async () => {
    if (content === null || content === undefined) {
      console.log("content is null || undef");
      return;
    }
    return service.getMediaBlocks();
  };
  //
  // const getAddedRecently = () => {
  //   if (content === null || content === undefined) {
  //     console.log("content is null || undef");
  //     return;
  //   }
  //   return service.getAddedRecently(content);
  // };
  //
  const deleteMedia = async (id: number) => {
    service.deleteMedia(id);
    service.getMediaBlocks().then((mbList) => {
      setMediaBlocks(mbList);
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

const deleteMovie = () => {
  return;
};

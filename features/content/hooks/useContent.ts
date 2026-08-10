import { useEffect, useState } from "react";
import { ContentData } from "../entity/ContentData";
import * as bd from "../bd/bd";
import { contentDataInit } from "@/features/contentItin";
import * as service from "../services/contentService";
import { Media } from "../entity/media";
import { ContentType } from "@/types/content-type/contentType";
import localforage from "localforage";
const medias: Media[] = [
  {
    name: "Interstellar",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    rate: 10,
    contentType: "film",
    contentStatus: "favorite",
    dateOfAdd: new Date(),
  },
  {
    name: "Breaking Bad",
    genres: ["Crime", "Drama", "Thriller"],
    rate: 9,
    contentType: "series",
    contentStatus: "completed",
    dateOfAdd: new Date(),
  },
  {
    name: "The Witcher",
    genres: ["Fantasy", "Adventure", "Action"],
    rate: 8,
    contentType: "series",
    contentStatus: "favorite",
    dateOfAdd: new Date(),
  },
  {
    name: "Inception",
    genres: ["Sci-Fi", "Action", "Thriller"],
    rate: 9,
    contentType: "film",
    contentStatus: "completed",
    dateOfAdd: new Date(),
  },
  {
    name: "Stranger Things",
    genres: ["Fantasy", "Horror", "Drama"],
    rate: 7,
    contentType: "series",
    contentStatus: "favorite",
    dateOfAdd: new Date(),
  },
];

// const addMockMedias = (addMedia: any) => {
//     medias.forEach(addMedia);
// };
//
export function useContent() {
  const [content, setContent] = useState<ContentData | null>(contentDataInit());

  const load = (): Promise<ContentData | null> => {
    return bd.getContent();
  };

  /*if this funciton will use before init component => they may droped*/
  const addMedia = async (title: Media) => {
    if (content === null || content === undefined) {
      console.log("content is null || undef");
      return;
    }
    const newContent = service.add(title, content);
    setContent(newContent);

    await bd.storeContent(newContent);
  };

  const getByType = (type: ContentType) => {
    if (content === null || content === undefined) {
      console.log("content is null || undef");
      return;
    }
    service.getByType(type, content);
  };

  const getMediaBlocks = () => {
    if (content === null || content === undefined) {
      console.log("content is null || undef");
      return;
    }
    return service.getMediaBlocks(content);
  };

  const getAddedRecently = () => {
    if (content === null || content === undefined) {
      console.log("content is null || undef");
      return;
    }
    return service.getAddedRecently(content);
  };

  useEffect(() => {
    load().then((loadedContent) => {
      if (loadedContent === null) {
        let newContent = contentDataInit();
        newContent = service.addMediaList(medias, newContent);
        bd.storeContent(newContent);
        setContent(newContent);
      } else {
        setContent(loadedContent);
      }
    });
  }, []);
  return { content, addMedia, getByType, getMediaBlocks, getAddedRecently };
}

const deleteMovie = () => {
  return;
}
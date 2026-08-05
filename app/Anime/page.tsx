"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/app/components/modal";
import X from "@/app/components/icons/x";
import { setDataStartEndIndexes } from "recharts/types/state/chartDataSlice";
import { ModalMediaEditor } from "../features/modal-media-editor";
import { useContent } from "@/features/content/hooks/useContent";
import { Media } from "@/features/content/entity/media";
import Plus from "@/app/components/icons/plus";
import { ContentStatus } from "@/types/content-status/content-status";
import { MediaCard } from "../features/media-card";

export default function Movie() {
  const [isOpen, setIsOpen] = useState(false);
  const { content, getMediaBlocks, addMedia } = useContent();
  const [anime, setAnime] = useState<Media[]>([]);

  useEffect(() => {
    if (content) {
      const mediaBlocks = getMediaBlocks?.();
      if (mediaBlocks) {
        const allMedia: Media[] = [];
        Object.values(mediaBlocks).forEach((block) => {
          if (block.mediaList && Array.isArray(block.mediaList)) {
            allMedia.push(...block.mediaList);
          }
        });
        const filteredAnime = allMedia.filter(
          (item) => item.contentType === "anime",
        );

        if (filteredAnime.length !== anime.length) {
          setAnime(filteredAnime);
        }
      }
    }
  }, [content, getMediaBlocks]);

  return (
    <>
      <div className="flex justify-center items-center mb-[50px] mt-[30px] pageInfo">
        <h2 className="mr-[30px]">Мои Аниме</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="flex button justify-between"
        >
          <Plus />
          Добавить
        </button>
      </div>

      <ModalMediaEditor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addMedia={addMedia}
      ></ModalMediaEditor>

      <div className="">
        <div className="gap-[20px] grid grid-cols-5 p-4">
          {anime.length === 0 ? (
            <p className="noneText">Аниме пока нет</p>
          ) : (
            anime.map((movie, index) => (
              <MediaCard key={index} title={movie}></MediaCard>
            ))
          )}
        </div>
      </div>
    </>
  );
}

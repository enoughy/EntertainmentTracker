"use client";

import { useState, useEffect } from "react";
import { ModalMediaEditor } from "../features/modal-media-editor";
import { useContent } from "@/features/content/hooks/useContent";
import { Media } from "@/features/content/entity/media";
import Plus from "@/app/components/icons/plus";
import { MediaCard } from "../features/media-card";

export default function Movie() {
  const [isOpen, setIsOpen] = useState(false);
  const { content, getMediaBlocks, addMedia } = useContent();
  const [movies, setMovies] = useState<Media[]>([]);

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
        const filteredMovies = allMedia.filter(
          (item) => item.contentType === "film",
        );

        if (filteredMovies.length !== movies.length) {
          setMovies(filteredMovies);
        }
      }
    }
  }, [content, getMediaBlocks]);

  return (
    <>
      <div className="flex justify-center items-center mb-[50px] mt-[30px] pageInfo">
        <h2 className="mr-[30px]">Мои фильмы</h2>
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
          {movies.length === 0 ? (
            <p className="noneText">Фильмов пока нет</p>
          ) : (
            movies.map((movie, index) => (
              <MediaCard key={index} title={movie}></MediaCard>
            ))
          )}
        </div>
      </div>
    </>
  );
}

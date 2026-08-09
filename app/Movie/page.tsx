"use client";

import { useState, useEffect } from "react";
import { ModalMediaEditor } from "../features/modal-media-editor";
import { useContent } from "@/features/content/hooks/useContent";
import { Media } from "@/features/content/entity/media";
import Plus from "@/app/components/icons/plus";
import { MediaCard } from "../features/media-card";
import ModalMediaViewer from "../features/modal-card-info";

export default function Movie() {
  const [isOpen, setIsOpen] = useState(false);
  const { content, mediaBlocks, addMedia } = useContent();
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [movies, setMovies] = useState<Media[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Media | null>(null);

  useEffect(() => {
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
  }, [content, mediaBlocks]);

  const cardClick = (movie: Media) => {
    setSelectedMovie(movie);
    setIsOpenCard(true);
  };

  const handleUpdateMovie = (updatedMovie: Media) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie === selectedMovie ? updatedMovie : movie,
      ),
    );
  };

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
        type={"film"}
      ></ModalMediaEditor>

      <ModalMediaViewer
        isOpenCard={isOpenCard}
        setIsOpenCard={setIsOpenCard}
        movie={selectedMovie}
        onUpdate={handleUpdateMovie}
      ></ModalMediaViewer>

      <div className="">
        <div className="gap-[20px] grid grid-cols-5 p-4">
          {movies.length === 0 ? (
            <p className="noneText">Фильмов пока нет</p>
          ) : (
            movies.map((movie, index) => (
              <MediaCard
                key={index}
                title={movie}
                onClick={() => cardClick(movie)}
              ></MediaCard>
            ))
          )}
        </div>
      </div>
    </>
  );
}

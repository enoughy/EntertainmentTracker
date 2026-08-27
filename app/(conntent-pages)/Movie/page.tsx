"use client";

import { useState, useEffect } from "react";
import { ModalMediaEditor } from "../../../features/modal-media-editor/modal-media-editor";
import { useContent } from "@/features/content/hooks/useContent";
import { Media } from "@/features/content/entity/media";
import Plus from "@/components/icons/plus";
import { MediaCard } from "../../../features/media-card/media-card";
import ModalMediaViewer from "../../../features/modal-card-info/modal-card-info";

export default function Movie() {
  const [isOpen, setIsOpen] = useState(false);
  const { content, mediaBlocks, addMedia, deleteMedia } = useContent();
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
  const handleDelete = (deletedMedia: Media) => {
    deleteMedia(deletedMedia.id!);
  };

  return (
    <>
      <div className="flex justify-center items-center mb-[50px] mt-[30px] pageInfo">
        <h2 className="mr-[30px] dark:text-white/90">Мои фильмы</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="flex button justify-between cursor-pointer dark:bg-[#575c61] dark:text-white dark:border dark:border-black/40"
        >
          +
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
        onDelete={handleDelete}
        isOpenCard={isOpenCard}
        setIsOpenCard={setIsOpenCard}
        movie={selectedMovie}
        onUpdate={handleUpdateMovie}
      ></ModalMediaViewer>

      <div className="">
        <div className="gap-[20px] grid grid-cols-5 p-4">
          {movies.length === 0 ? (
            <p className="noneText dark:text-white/40">Фильмов пока нет</p>
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

"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/features/content/hooks/useContent";
import { Media } from "@/features/content/entity/media";
import Plus from "@/app/components/icons/plus";
import { ContentStatus } from "@/types/content-status/content-status";
import { Rate } from "@/types/rate/rate";
import { ModalMediaEditor } from "../features/modal-media-editor";

export default function Movie() {
  const [isOpen, setIsOpen] = useState(false);
  const { content, getMediaBlocks, addMedia } = useContent();
  const [series, setSeries] = useState<Media[]>([]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState<ContentStatus>("favorite");

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
        const filteredSeries = allMedia.filter(
          (item) => item.contentType === "series",
        );

        if (filteredSeries.length !== series.length) {
          setSeries(filteredSeries);
        }
      }
    }
  }, [content, getMediaBlocks]);

  async function addMovie() {
    if (!title.trim() || !genre.trim() || !rating.trim() || !status.trim()) {
      alert("Заполните все поля");
      return;
    }

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 10) {
      alert("Рейтинг должен быть от 1 до 10");
      return;
    }

    const series: Media = {
      name: title,
      genres: genre.split(",").map((g) => g.trim()),
      rate: numRating as Rate,
      contentType: "series",
      contentStatus: status,
      dateOfAdd: new Date(),
    };

    await addMedia(series);

    setTitle("");
    setGenre("");
    setRating("");
    setStatus("favorite");

    setIsOpen(false);
  }

  return (
    <>
      <div className="flex justify-center items-center mb-[50px] mt-[30px] pageInfo">
        <h2 className="mr-[30px]">Мои Сериалы</h2>
        <button onClick={() => setIsOpen(true)} className="button flex gap-2">
          <Plus />
          Добавить
        </button>
      </div>

      <ModalMediaEditor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addMedia={addMovie}
      ></ModalMediaEditor>

      <div className="flex justify-center">
        <div className="gap-[20px] movies">
          {series.length === 0 ? (
            <p>Сериалов пока нет</p>
          ) : (
            series.map((movie, index) => (
              <div
                key={index}
                className="bg-card-bg p-[20px] text-card-text rounded-[15px] cardMovie"
              >
                <p>Название: {movie.name}</p>
                <p>Жанр: {movie.genres.join(", ")}</p>
                {movie.rate <= 10 && movie.rate > 6 ? (
                  <p className="bg-[green] p-[5px] rounded-[10px] mb-[15px] mt-[10px]">
                    Оценка: {movie.rate}/10
                  </p>
                ) : movie.rate <= 6 && movie.rate > 3 ? (
                  <p className="bg-[gold] p-[7px] rounded-[10px] mb-[15px] mt-[10px]">
                    Оценка: {movie.rate}/10
                  </p>
                ) : (
                  <p className="bg-[red] p-[7px] rounded-[10px] mb-[15px] mt-[10px]">
                    Оценка: {movie.rate}/10
                  </p>
                )}
                {movie.contentStatus === "favorite" ? (
                  <p className="bg-[#ff6787] p-[3px] rounded-[10px]">
                    Статус: Любимое
                  </p>
                ) : movie.contentStatus === "completed" ? (
                  <p className="bg-[#87d68d] p-[3px] rounded-[10px]">
                    Статус: Просмотрено
                  </p>
                ) : movie.contentStatus === "in_progress" ? (
                  <p className="bg-[#ffc766] p-[3px] rounded-[10px]">
                    Статус: В процессе
                  </p>
                ) : movie.contentStatus === "planning" ? (
                  <p className="bg-[#9a99f4] p-[3px] rounded-[10px]">
                    Статус: Запланировано
                  </p>
                ) : (
                  <p className="bg-[#483c46] p-[3px] rounded-[10px]">
                    Статус: Брошено
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

import { Modal } from "@/components/modal/modal";
import { useState, useEffect } from "react";
import X from "@/components/icons/x";
import { Media } from "@/features/content/entity/media";
import { NoImage } from "@/img/svg/no-image/no-image";
import { ContentStatus } from "@/types/content-status/content-status";

interface ModalMediaViewerProps {
  isOpenCard: boolean;
  setIsOpenCard: (isOpen: boolean) => void;
  movie: Media | null;
  onUpdate?: (updatedMovie: Media) => void;
}

const TYPE_NAME: Record<ContentStatus, string> = {
  completed: "Просмотренно",
  favorite: "Любимое",
  dropped: "Брошено",
  in_progress: "Просматриваю сейчас",
  planning: "В планах",
};

export default function ModalMediaViewer({
  isOpenCard,
  setIsOpenCard,
  movie,
  onUpdate,
}: ModalMediaViewerProps) {
  const [rate, setRate] = useState(movie?.rate ?? 1);
  const [status, setStatus] = useState(movie?.contentStatus ?? "favorite");
  const [name, setName] = useState(movie?.name ?? "");

  useEffect(() => {
    if (movie) {
      setRate(movie.rate);
      setStatus(movie.contentStatus);
      setName(movie.name);
    }
  }, [movie]);

  if (!movie) return null;

  const save = () => {
    if (!movie) return null;

    const updatedMovie: Media = {
      ...movie,
      name: name,
      rate: rate,
      contentStatus: status,
    };

    if (onUpdate) {
      onUpdate(updatedMovie);
    }

    setIsOpenCard(false);
  };

  const cancel = () => {
    if (movie) {
      setRate(movie.rate);
      setStatus(movie.contentStatus);
      setName(movie.name);
    }

    setIsOpenCard(false);
  };

  return (
    <Modal isOpen={isOpenCard}>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => setIsOpenCard(false)}
            className="cursor-pointer hover:bg-[lightgray] p-[3px] transition-colors duration-250 ease [clip-path:circle(50%)]"
          >
            <X />
          </button>
        </div>
        <div className="w-[100%] flex flex-row justify-between">
          <div>
            <p className="mt-[20px] mb-[10px]">
              Жанры: {movie.genres.join(", ")}
            </p>
            <label>Рейтинг: </label>
            <input
              type="number"
              value={rate}
              className="mb-[10px]"
              onChange={(e) => setRate(Number(e.target.value))}
            />
            <p className="mb-[10px]">
              Тип:{" "}
              {movie.contentType === "film"
                ? "Фильм"
                : movie.contentType === "series"
                  ? "Сериал"
                  : "Аниме"}
            </p>
            <label>Статус: </label>
            <select
              className="mb-[10px]"
              value={status}
              onChange={(e) => setStatus(e.target.value as ContentStatus)}
            >
              <option value="favorite">Любимое</option>
              <option value="completed">Просмотренно</option>
              <option value="in_progress">Просматриваю сейчас</option>
              <option value="planning">В планах</option>
              <option value="dropped">Брошено</option>
            </select>
            <p>Добавлено: {movie.dateOfAdd.toLocaleDateString("ru-RU")}</p>
          </div>
          {movie?.imgFile != null ? (
            <img
              src={URL.createObjectURL(movie.imgFile)}
              width="200"
              height="2"
            />
          ) : (
            <NoImage className="w-[150px] h-[150px]"></NoImage>
          )}
        </div>
        <div className="flex flex-row justify-center items-center gap-[20px] mt-[15px]">
          <button
            className="border border-black/[0.5] p-[3px] rounded-[12px] cursor-pointer"
            onClick={cancel}
          >
            Отмена
          </button>
          <button
            className="border border-black/[0.5] p-[3px] rounded-[12px] cursor-pointer"
            onClick={() => {
              rate <= 10 && rate > 1
                ? save
                : alert("Рейтинг должен быть то 1 до 10 ulululu");
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </Modal>
  );
}

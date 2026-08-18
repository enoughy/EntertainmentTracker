import { Modal } from "@/components/modal/modal";
import { useState, useEffect } from "react";
import X from "@/components/icons/x";
import { Media } from "@/features/content/entity/media";
import { NoImage } from "@/img/svg/no-image/no-image";
import { STATUS_NAME } from "@/types/content-status/content-status-name";
import { GenersBlock } from "./chips/geners-block/geners-block";
import { TextBlock } from "./adict-text-block/text-block";
import { UpAnim } from "@/components/animations/up-anim/up-anim";
import { FaRegStar } from "react-icons/fa";
import { Header } from "./header/header";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

interface ModalMediaViewerProps {
  isOpenCard: boolean;
  setIsOpenCard: (isOpen: boolean) => void;
  movie: Media | null;
  onUpdate: (updatedMovie: Media) => void;
  onDelete: (deletedMedia: Media) => void;
}

export default function ModalMediaViewer({
  isOpenCard,
  setIsOpenCard,
  movie,
  onUpdate,
  onDelete,
}: ModalMediaViewerProps) {
  const [sectionId, setSectionId] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  if (!movie) return null;

  const save = (data: any) => {
    if (!movie) return null;

    const updatedMovie: Media = {
      ...movie,
      name: data.name ?? movie.name,
      rate: data.rate ?? movie.rate,
      discription: data.discription ?? movie.discription,
      contentStatus: data.status ?? movie.contentStatus,
    };

    onUpdate(updatedMovie);

    setIsOpenCard(false);
  };

  const cancel = () => {
    setIsOpenCard(false);
    reset();
  };

  return (
    <Modal isOpen={isOpenCard}>
      {/* Header close button */}
      <div className="flex items-center justify-end ">
        <button
          onClick={cancel}
          className="cursor-pointer rounded-xl p-2 transition-colors duration-200 hover:bg-black/5"
          aria-label="Закрыть"
        >
          <X />
        </button>
      </div>

      <form onSubmit={handleSubmit(save)} className="min-h-220 mt-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* Left: Image */}
          <UpAnim>
            <div className="w-full lg:w-[280px] mr-9">
              <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden hover:border-text-primary transition-colors duration-200">
                {movie?.imgFile != null ? (
                  <img
                    src={URL.createObjectURL(movie.imgFile)}
                    className=" w-full object-cover aspect-2/3"
                    alt=""
                  />
                ) : (
                  <div className="flex items-center justify-center ">
                    <NoImage className="w-full object-cover aspect-2/3" />
                  </div>
                )}

                {/* Status + Rating under image */}
                <div className="p-4 flex flex-col gap-2 border-t border-black/5 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-black/60">Статус</p>
                    <p className="text-sm font-semibold text-black/85">
                      {STATUS_NAME?.[movie.contentStatus] ??
                        movie.contentStatus}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-black/60">Оценка</p>
                    <p className="text-xl font-semibold text-black/85 flex">
                      <FaRegStar className="mr-1"></FaRegStar>
                      {movie.rate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </UpAnim>

          {/* Right: Info (view-like) */}

          <div className="flex-1">
            <Header
              handlerDelete={() => onDelete(movie)}
              sectionId={sectionId}
              setSectionId={setSectionId}
            ></Header>
            {/* Title + small meta */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs text-black/55 mb-1">
                  {movie.contentType === "film"
                    ? "Фильм"
                    : movie.contentType === "series"
                      ? "Сериал"
                      : "Аниме"}
                  {new Date(movie.dateOfMedia ?? "").getFullYear()}
                </p>

                {/* title */}
                <input
                  defaultValue={movie.name}
                  type="text"
                  {...register("name")}
                  className="w-full bg-transparent text-2xl sm:text-3xl font-semibold outline-none border-none p-0"
                />
              </div>
              {sectionId === 0 ? (
                <>
                  {/* Description */}
                  <div className="mt-1">
                    <p className="text-xs text-black/55 mb-2">Описание</p>
                    <TextareaAutosize
                      minRows={1}
                      maxRows={5}
                      defaultValue={movie.discription}
                      {...register("discription")}
                      className=" resize-none text-sm text-black/80 leading-relaxed min-h-10 border-none outline-none bg-transparent w-full"
                    ></TextareaAutosize>
                  </div>
                  {/* Genres as separate chips */}
                  <GenersBlock genres={movie.genres}></GenersBlock>
                  {/* Creator */}
                  <div className="flex justify-start pr-5">
                    <h3 className="text-sm font-bold text-text-main mb-2 mr-10">
                      Создатели:
                    </h3>
                    <p>лалаал</p>
                  </div>
                  {/* info grid */}
                  <div className="mt-1">
                    <p className="inline-flex text-xs text-black/55 mb-2 border-b-3 border-text-primary/40 pb-1">
                      Дополнительная информация
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {movie.adictInf?.map(({ name, text }, index) => (
                        <TextBlock key={index} name={name}>
                          {text}
                        </TextBlock>
                      ))}
                      <TextBlock name="Neweest">Период</TextBlock>

                      <TextBlock name="Выпуск">Продолжается</TextBlock>

                      <TextBlock name="Статус перевода">Продолжается</TextBlock>

                      <TextBlock name="Возрастное ограничение">
                        Для всех
                      </TextBlock>

                      <TextBlock name="Альтернативные названия">
                        My Useless Skill "Infinite Regeneration" Awakened,
                        Making Me the World's Strongest — Having Obtained
                        Ultimate Power, I Trample Everyone Who Opposes Me —
                        больше ничего не меняй
                      </TextBlock>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              <p className="text-xs text-black/55 mt-3">
                Добавлено: {movie.dateOfAdd.toLocaleDateString("ru-RU")}
              </p>
            </div>

            {/* Footer buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-end mt-5">
              <button
                className="border border-black/[0.2] p-[8px] rounded-[14px] cursor-pointer transition-colors hover:bg-black/5"
                onClick={cancel}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="bg-black text-white p-[8px] rounded-[14px] cursor-pointer transition-colors hover:bg-black/90"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

{
  /* Bottom: (если хочешь оставить селекты/инпуты, их можно спрятать под визуально аккуратные блоки; логика не трогаем) */
}
{
  /* <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"> */
}
{
  /*   <div className="rounded-xl border border-black/10 bg-white p-3"> */
}
{
  /*     <p className="text-xs text-black/55 mb-2">Рейтинг</p> */
}
{
  /*     <input */
}
{
  /*       type="number" */
}
{
  /*       value={rate} */
}
{
  /*       className="w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:shadow-[0_0_0_4px_rgba(0,0,0,0.06)]" */
}
{
  /*       onChange={(e) => setRate(Number(e.target.value) as Rate)} */
}
{
  /*     /> */
}
{
  /*   </div> */
}
{
  /**/
}
{
  /*   <div className="rounded-xl border border-black/10 bg-white p-3"> */
}
{
  /*     <p className="text-xs text-black/55 mb-2">Тип/Статус</p> */
}
{
  /*     <select */
}
{
  /*       className="w-full rounded-xl border-black/10 px-3 py-2 outline-none " */
}
{
  /*       value={status} */
}
{
  /*       onChange={(e) => setStatus(e.target.value as ContentStatus)} */
}
{
  /*     > */
}
{
  /*       {Object.entries(STATUS_NAME).map(([key, value]) => ( */
}
{
  /*         <option key={key} value={key}> */
}
{
  /*           {value} */
}
{
  /*         </option> */
}
{
  /*       ))} */
}
{
  /*     </select> */
}
{
  /*   </div> */
}
{
  /* </div> */
}

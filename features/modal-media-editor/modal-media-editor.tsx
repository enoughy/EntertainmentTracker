import { Modal } from "@/components/modal/modal";
import X from "@/components/icons/x";
import { setDataStartEndIndexes } from "recharts/types/state/chartDataSlice";
import { ContentStatus } from "@/types/content-status/content-status";
import { Rate } from "@/types/rate/rate";
import { MouseEventHandler, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Media } from "@/features/content/entity/media";
import { Download } from "@/img/download/download";
import { ContentType } from "@/types/content-type/contentType";
import { useForm } from "react-hook-form";
type ModalMediaEditorProps = {
  isOpen: boolean;
  setIsOpen: Function;
  addMedia: Function;
  type: ContentType;
};

export function ModalMediaEditor({
  isOpen,
  setIsOpen,
  addMedia,
  type,
}: ModalMediaEditorProps) {
  const [coverImgPath, setCoverImgPath] = useState<string>();
  const [coverImg, setCoverImg] = useState<File>();
  const [adInfCount, setAdInfCount] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  async function addTitle(data: any) {
    if (
      !data.title.trim() ||
      !data.genre.trim() ||
      !data.rating.trim() ||
      !data.status.trim() ||
      coverImgPath == null
    ) {
      alert("Заполните все поля");
      return;
    }

    const numRating = Number(data.rating);
    if (numRating < 1 || numRating > 10) {
      alert("Рейтинг должен быть от 1 до 10");
      return;
    }
    let i = 0;
    const arr = [];
    while (data[`adInfName${i}`] != null) {
      arr.push({ name: data[`adInfName${i}`], text: data[`adInfText${i}`] });
      i++;
    }
    const anime: Media = {
      name: data.title,
      genres: data.genre.split(",").map((g: string) => g.trim()),
      rate: numRating as Rate,
      contentType: type,
      contentStatus: data.status,
      dateOfAdd: new Date(),
      imgFile: coverImg,
      dateOfMedia: data.dateOfMedia,
      discription: data.discription,
      adictInf: arr,
    };

    console.log(anime);
    await addMedia(anime);

    setCoverImgPath(undefined);
    setCoverImg(undefined);

    setIsOpen(false);
    reset();
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setCoverImgPath(URL.createObjectURL(file));
    setCoverImg(file);
  }, []);

  const handleRemoveCover = () => {
    setCoverImgPath(undefined);
    setCoverImg(undefined);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <Modal isOpen={isOpen}>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="cursor-pointer closeBtn"
        >
          <X />
        </button>
      </div>
      <form onSubmit={handleSubmit(addTitle)} className="inputContainer">
        <div className="grid grid-cols-2 gap-x-7">
          {/* Drop Container */}
          <div
            className="relative w-full aspect-[2/3] overflow-hidden rounded-lg border-3 border-dashed bg-gray-100 h-[600px] border-gray-300"
            {...getRootProps()}
          >
            <input className="h-full" {...getInputProps()} />
            {coverImgPath == null ? (
              <div>
                <p className="flex items-center flex-col-reverse absolute w-full p-3 text-center top-[45%] left-[50%] translate-[-50%] text-gray-700">
                  <Download></Download>
                  Перетащите файл сюда или нажмите для выбора
                </p>
              </div>
            ) : (
              <>
                <img
                  src={coverImgPath}
                  alt=""
                  className="w-full h-full object-cover relative"
                />
                <button
                  onClick={handleRemoveCover}
                  className="absolute top-0 right-1 bg-white rounded-4xl"
                >
                  <X />
                </button>
              </>
            )}
          </div>

          <div className="overflow-scroll">
            <label>Название: </label>
            <input
              {...register("title", { required: "Введите название" })}
              className="inputField"
              type="text"
              placeholder="Название..."
              required
            />
            <br />
            <label>Жанр: </label>
            <input
              {...register("genre", { required: "Введите жанры" })}
              className="inputField"
              type="text"
              placeholder="экшен..."
              required
            />
            <br />
            <label>Описание: </label>
            <input
              {...register("discription", { required: "Введите Описание" })}
              className="inputField"
              type="text"
              placeholder="..."
              required
            />
            <br />
            <label>Дата создания: </label>
            <input
              {...register("dateOfMedia", { required: "Введите дату" })}
              className="inputField"
              type="date"
              placeholder="..."
              required
            />
            <br />

            <label>Ваша оценка от 1 до 10: </label>
            <input
              {...register("rating", {
                required: "Введите оценку",
                validate: (value) =>
                  (value >= 1 && value <= 10) || "От 1 до 10",
              })}
              className="inputField"
              type="number"
              placeholder="9"
              required
            />
            <label>Статус: </label>
            <select
              {...register("status", { required: "Выберите статус" })}
              className="w-full rounded-[4px] border border-slate-200 h-min-[40px] px-4 py-3 text-sm placeholder-slate-400 outline-none transition-all focus:border-indigo-600"
            >
              <option value="favorite" className="text-[#ff6787]">
                Любимое
              </option>
              <option value="completed" className="text-[#87d68d]">
                Просмотрено
              </option>
              <option value="in_progress" className="text-[#ffc766]">
                В процессе
              </option>
              <option value="planning" className="text-[#9a99f4]">
                Запланировано
              </option>
              <option value="dropped" className="text-[#483c46]">
                Брошено
              </option>
            </select>
            <label>Дополнительная информация: </label>
            <br />
            {Array.from({ length: adInfCount }).map((_, index) => (
              <div key={index}>
                <label>Название блока: </label>
                <input
                  {...register(`adInfName${index}`, {
                    required: "Введите Описание",
                  })}
                  className="inputField"
                  type="text"
                  placeholder="..."
                  required
                />
                <br />
                <label>Информация: </label>
                <input
                  {...register(`adInfText${index}`, {
                    required: "Введите Описание",
                  })}
                  className="inputField"
                  type="text"
                  placeholder="..."
                  required
                />
                <br />
              </div>
            ))}
            <button
              onClick={() => setAdInfCount(adInfCount + 1)}
              className="button"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            // className="cursor-pointer bg-[lightgray] p-[7px] rounded-[10px] border 2border-[gray] addBtn"
            type="submit"
            className="mt-5 button"
          >
            Добавить
          </button>
        </div>
      </form>
    </Modal>
  );
}

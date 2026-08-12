import { Modal } from "@/components/modal/modal";
import X from "@/components/icons/x";
import { setDataStartEndIndexes } from "recharts/types/state/chartDataSlice";
import { ContentStatus } from "@/types/content-status/content-status";
import { Rate } from "@/types/rate/rate";
import { MouseEventHandler, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Media } from "@/features/content/entity/media";
import { Download } from "@/img/download/download";
type ModalMediaEditorProps = {
  isOpen: boolean;
  setIsOpen: Function;
  addMedia: Function;
};

export function ModalMediaEditor({
  isOpen,
  setIsOpen,
  addMedia,
}: ModalMediaEditorProps) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState<ContentStatus>("favorite");
  const [coverImgPath, setCoverImgPath] = useState<string>();
  const [coverImg, setCoverImg] = useState<File>();

  async function addTitle() {
    if (
      !title.trim() ||
      !genre.trim() ||
      !rating.trim() ||
      !status.trim() ||
      coverImgPath == null
    ) {
      alert("Заполните все поля");
      return;
    }

    const numRating = Number(rating);
    if (numRating < 1 || numRating > 10) {
      alert("Рейтинг должен быть от 1 до 10");
      return;
    }

    const anime: Media = {
      name: title,
      genres: genre.split(",").map((g) => g.trim()),
      rate: numRating as Rate,
      contentType: "anime",
      contentStatus: status,
      dateOfAdd: new Date(),
      imgFile: coverImg,
    };
    console.log(anime);

    await addMedia(anime);

    setTitle("");
    setGenre("");
    setRating("");
    setStatus("favorite");
    setCoverImgPath(undefined);
    setCoverImg(undefined);

    setIsOpen(false);
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
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
            setTitle("");
            setGenre("");
            setRating("");
          }}
          className="cursor-pointer closeBtn"
        >
          <X />
        </button>
      </div>
      <div className="inputContainer">
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

          <div>
            <label>Название: </label>
            <input
              className="inputField"
              type="text"
              placeholder="Название..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <br />
            <label>Жанр: </label>
            <input
              className="inputField"
              type="text"
              placeholder="экшен..."
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
            <br />
            <label>Ваша оценка от 1 до 10: </label>
            <input
              className="inputField"
              type="number"
              placeholder="9"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
            <label>Статус: </label>
            <select
              className="w-full rounded-[4px] border border-slate-200 h-min-[40px] px-4 py-3 text-sm placeholder-slate-400 outline-none transition-all focus:border-indigo-600"
              onChange={(e) => setStatus(e.target.value as ContentStatus)}
              value={status}
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
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          // className="cursor-pointer bg-[lightgray] p-[7px] rounded-[10px] border 2border-[gray] addBtn"
          className="mt-5 button"
          onClick={addTitle}
        >
          Добавить
        </button>
      </div>
    </Modal>
  );
}

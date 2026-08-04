import { Modal } from "@/app/components/modal";
import X from "@/app/components/icons/x";
import { setDataStartEndIndexes } from "recharts/types/state/chartDataSlice";
import { ContentStatus } from "@/types/content-status/content-status";
import { Rate } from "@/types/rate/rate";
import { MouseEventHandler, useState } from "react";

type ModalMediaEditorProps = {
  isOpen: boolean;
  setIsOpen: Function;
  addMedia: MouseEventHandler;
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
        <label>Название: </label>
        <input
          className="w-full rounded-[4px] border border-slate-200 h-min-[40px] px-4 py-3 text-sm placeholder-slate-400 outline-none transition-all focus:border-indigo-600"
          type="text"
          placeholder="Название..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>Жанр: </label>
        <input
          className="w-full rounded-[4px] border border-slate-200 h-min-[40px] px-4 py-3 text-sm placeholder-slate-400 outline-none transition-all focus:border-indigo-600"
          type="text"
          placeholder="экшен..."
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <br />
        <label>Ваша оценка от 1 до 10: </label>
        <input
          className="w-full rounded-[4px] border border-slate-200 h-min-[40px] px-4 py-3 text-sm placeholder-slate-400 outline-none transition-all focus:border-indigo-600"
          type="number"
          placeholder="9"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <label>Статус: </label>
        <select
          className="w-full rounded-[4px] border border-slate-200 h-min-[40px] px-4 py-3 text-sm placeholder-slate-400 outline-none transition-all focus:border-indigo-600"
          onChange={(e) => setStatus(e.target.value)}
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
      <div className="flex justify-center">
        <button
          // className="cursor-pointer bg-[lightgray] p-[7px] rounded-[10px] border 2border-[gray] addBtn"
          className="mt-5 button"
          onClick={addMedia}
        >
          Добавить
        </button>
      </div>
    </Modal>
  );
}

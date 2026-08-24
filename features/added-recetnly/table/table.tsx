import { TableItem } from "./table-item";
import { Media } from "@/features/content/entity/media";

const test: Media = {
  name: "test Name",
  genres: ["жанр 1", "экшен"],
  rate: 9,
  contentStatus: "favorite",
  contentType: "anime",
  dateOfAdd: new Date(),
};

type TableProps = {
  mediaList: Media[];
  onClick: (item: any) => void;
  handlerDelete?: (item: any) => void;
};

export function Table({ mediaList, onClick, handlerDelete }: TableProps) {
  return (
    <>
      <div className="grid grid-cols-[7fr_6fr_6fr_4fr_7fr_1fr] text-text-gray-2 text-[14px]  mb-3 dark:text-[rgba(255,255,255,0.7)]">
        <h2>Название</h2>
        <h2>Тип</h2>
        <h2>Жанр</h2>
        <h2>Оценка</h2>
        <h2>Статус</h2>
      </div>
      <div className=" border-b-1 border-text-gray-3 mb-5 -mx-5.5"></div>

      {mediaList.length > 0 ? (
        mediaList.map((md, index) => (
          <TableItem
            onClick={() => onClick(md)}
            key={index}
            item={md}
            handlerShow={onClick}
            handlerDelete={handlerDelete}
          ></TableItem>
        ))
      ) : (
        <div className="text-text-gray text-center font-medium text-4 dark:text-[rgba(255,255,255,0.4)]">
          Данных нет
        </div>
      )}
    </>
  );
}

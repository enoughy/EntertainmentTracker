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
};

export function Table({ mediaList }: TableProps) {
  return (
    <>
      <div className="grid grid-cols-[4fr_3fr_3fr_3fr_1fr] text-text-gray-2 text-[14px]  mb-3 ">
        <h2>Название</h2>
        <h2>Жанр</h2>
        <h2>Оценка</h2>
        <h2>Статус</h2>
      </div>
      <div className=" border-b-1 border-text-gray-3 mb-5 -mx-5.5"></div>

      {mediaList.length > 0 ? (
        mediaList.map((md, index) => (
          <TableItem key={index} item={md}></TableItem>
        ))
      ) : (
        <div className="text-text-gray-2 font-medium text-4">Данных нет</div>
      )}
    </>
  );
}

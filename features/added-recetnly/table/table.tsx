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

export function Table() {
  return (
    <>
      {" "}
      <div className="grid grid-cols-[4fr_3fr_3fr_3fr_1fr]">
        <h2>Название</h2>
        <h2>Жанр</h2>
        <h2>Оценка</h2>
        <h2>Статус</h2>
      </div>
      <TableItem item={test}></TableItem>
    </>
  );
}

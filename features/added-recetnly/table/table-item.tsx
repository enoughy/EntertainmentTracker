import { StatusCard } from "@/components/status-card/status-card";
import { Media } from "@/features/content/entity/media";
import { TYPE_NAME } from "@/types/content-type/contentTypeNameTable";
import { Menu } from "./menu";
import { on } from "events";

type TableItemProps = {
  item: Media;
  onClick: () => void;
  handlerDelete?: (item: any) => void;
  handlerShow?: (item: any) => void;
};
export function TableItem({
  item,
  onClick,
  handlerDelete,
  handlerShow,
}: TableItemProps) {
  return (
    <div
      onClick={() => onClick()}
      className="border-b-1 rounded-xl border-[#CFE0FA] last:border-none px-2 hover:bg-[#CFE0FA]/20 transition-colors duration-150"
    >
      <div className="grid grid-cols-[7fr_6fr_6fr_4fr_6fr_1fr] min-h-16 text-[16px] font-medium  text-text-gray items-center justify-center ">
        <p>{item.name}</p>
        <p>{TYPE_NAME[item.contentType]}</p>
        <p>{item.genres[0] + item.genres[1]}</p>
        <p>{item.rate}</p>
        <StatusCard status={item.contentStatus}></StatusCard>
        <Menu
          handlerDelete={() => handlerDelete?.(item)}
          handlerShow={() => handlerShow?.(item)}
        ></Menu>
      </div>
    </div>
  );
}

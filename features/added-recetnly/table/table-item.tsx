import { Media } from "@/features/content/entity/media";
import { TYPE_NAME } from "@/types/content-status/content-status-name";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";

type TableItemProps = {
  item: Media;
};
export function TableItem({ item }: TableItemProps) {
  return (
    <div className="grid grid-cols-[7fr_6fr_6fr_6fr_1fr] text-[16px] border-b-1 border-[#CFE0FA] pb-4 mb-4 font-medium last:border-none text-text-gray">
      <p>{item.name}</p>
      <p>{item.genres[0] + item.genres[1]}</p>
      <p>{item.rate}</p>
      <p>{TYPE_NAME[item.contentStatus]}</p>
      <BsThreeDotsVertical className="text-text-gray-2"></BsThreeDotsVertical>
    </div>
  );
}

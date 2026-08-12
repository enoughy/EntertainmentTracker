import { StatusCard } from "@/components/status-card/status-card";
import { Media } from "@/features/content/entity/media";
import { TYPE_NAME } from "@/types/content-status/content-status-name";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { motion } from "motion/react";

type TableItemProps = {
  item: Media;
};
export function TableItem({ item }: TableItemProps) {
  return (
    <div className="border-b-1 border-[#CFE0FA] last:border-none mb-4 ">
      <motion.div whileHover={{ y: -3 }}>
        <div className="grid grid-cols-[7fr_6fr_6fr_6fr_1fr] text-[16px] pb-4 font-medium  text-text-gray ">
          <p>{item.name}</p>
          <p>{item.genres[0] + item.genres[1]}</p>
          <p>{item.rate}</p>
          <StatusCard status={item.contentStatus}></StatusCard>
          <div className="hover:bg-slate-100 rounded-4xl transition-colors duration-100 flex items-center justify-center">
            <BsThreeDotsVertical className="text-text-gray-2"></BsThreeDotsVertical>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

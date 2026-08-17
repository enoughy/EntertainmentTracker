import { PATH_NAME } from "@/types/path-name/pathName";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IconChoose } from "./icon-choose";
import Link from "next/link";

type PageNaveItemProps = {
  pathName: string;
};

export function PageNaveItem({ pathName }: PageNaveItemProps) {
  return (
    <>
      <MdOutlineKeyboardArrowRight className="text-text-main/80 w-6 h-6 " />
      <Link
        href={pathName}
        className="px-4 py-2 rounded-2xl hover:bg-white flex items-center last:cursor-default"
      >
        <IconChoose pathName={pathName}></IconChoose>
        <h1 className="text-text-gray-2">{PATH_NAME[pathName]}</h1>
      </Link>
    </>
  );
}

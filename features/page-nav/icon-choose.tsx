import { IoStatsChartOutline } from "react-icons/io5";
import { FaFilm } from "react-icons/fa6";
import { RiPlayList2Fill } from "react-icons/ri";
import { TiSpiral } from "react-icons/ti";
type IconChooseProps = {
  pathName: string;
};
export function IconChoose({ pathName }: IconChooseProps) {
  switch (pathName) {
    case "/":
      return <IoStatsChartOutline className="text-text-gray mr-1.5" />;
    case "/Movie":
      return <FaFilm className="text-text-gray mr-1.5" />;
    case "/Anime":
      return <RiPlayList2Fill className="text-text-gray mr-1.5" />;
    case "/Series":
      return <TiSpiral className="text-text-gray mr-1.5" />;
    default:
      return "";
  }
}

import { Media } from "@/features/content/entity/media";
import { NoImage } from "@/img/svg/no-image/no-image";
import { ContentStatus } from "@/types/content-status/content-status";
import { STATUS_NAME } from "@/types/content-status/content-status-name";
import { Star } from "lucide-react";

type MediaCardProps = {
  title: Media;
  onClick?: (e: any) => void;
};
const options: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
};

export function MediaCard({ title, onClick }: MediaCardProps) {
  let imgUrl = "";
  if (title.imgFile != null) {
    imgUrl = URL.createObjectURL(title.imgFile);
  }

  return (
    <div className="p-[15px] rounded-[24px] mediaCard" onClick={onClick}>
      <div className="relative w-full  aspect-2/3 overflow-hidden rounded-2xl ">
        {imgUrl !== "" ? (
          <img
            className="rounded-2xl w-full h-full object-cover hover:scale-105 transition-transform duration-400"
            src={imgUrl}
          ></img>
        ) : (
          <div className="rounded-2xl w-full h-full bg-gray-200 object-cover hover:scale-105 transition-transform duration-400">
            <NoImage></NoImage>
          </div>
        )}

        <div className="flex justify-between items-center absolute rounded-4xl bg-text-main/60 text-white w-[61px] h-[30px] bottom-[5%] right-1 px-3 py-2">
          <Star width={12} height={12} fill="#fff" stroke="#fff"></Star>
          {title.rate}
        </div>
      </div>
      <div className="rounded-2xl text-card-text w-full text-[17px] font-medium">
        <div className="flex justify-between text-text-gray items-center">
          <p className="dark:text-white/70">{STATUS_NAME[title.contentStatus]}</p>
          <p className="text-[12px] text-text-main dark:text-white/70">
            {title.dateOfAdd.toLocaleDateString("ru-RU", options)}
          </p>
        </div>
        <p className="dark:text-white/90">{title.name}</p>
      </div>
    </div>
  );
}

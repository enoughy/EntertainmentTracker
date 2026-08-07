import { Media } from "@/features/content/entity/media";

type TableItemProps = {
  item: Media;
};
export function TableItem({ item }: TableItemProps) {
  return (
    <div className="grid grid-cols-[4fr_3fr_3fr_3fr_1fr]">
      <p>{item.name}</p>
      <p>{item.genres[0] + item.genres[1]}</p>
      <p></p>
      <p></p>
    </div>
  );
}

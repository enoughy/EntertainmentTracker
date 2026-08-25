import { Menu } from "@/components/menu/menu";
import { Media } from "@/features/content/entity/media";

export function Header({
  sectionId,
  setSectionId,
  handlerDelete,
}: {
  sectionId: number;
  setSectionId: Function;
  handlerDelete: () => void;
}) {
  return (
    <div className="flex justify-between  border-b border-text-main/30 pb-3 mb-6">
      <div className="flex justify-start gap-5 text-sm rounded- px-2 ">
        <h1
          onClick={() => setSectionId(0)}
          className="px-1 rounded cursor-pointer transition-colors duration-200"
          style={
            sectionId === 0
              ? { borderBottom: "4px solid var(--color-text-primary)" }
              : {}
          }
        >
          Тайтл
        </h1>
        <h1
          className="px-1 rounded cursor-pointer transition-colors duration-200"
          style={
            sectionId === 1
              ? { borderBottom: "4px solid var(--color-text-primary)" }
              : {}
          }
          onClick={() => setSectionId(1)}
        >
          Дополнительная информация
        </h1>
      </div>
      <div className="mr-3">
        <Menu handlerDelete={handlerDelete}></Menu>
      </div>
    </div>
  );
}

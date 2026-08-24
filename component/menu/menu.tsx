import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect } from "react";
import { useRef } from "react";

type MenuProps = {
  handlerDelete?: () => void;
  handlerShow?: () => void;
};
export function Menu({ handlerDelete, handlerShow }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <div className="relative">
        {/* Menu button*/}
        <div
          data-testid="menu"
          ref={menuRef}
          className="hover:bg-white min-h-7 rounded-4xl transition-colors duration-100 flex items-center justify-center h-full"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <BsThreeDotsVertical className="text-text-gray-2 relative z-1"></BsThreeDotsVertical>
        </div>
        {/* Menu Container */}
        <div
          hidden={isOpen ? false : true}
          className={
            " absolute right-0 bottom-0 translate-x-[50%] translate-y-[100%] z-1000000"
          }
        >
          <div className="bg-white rounded-2xl p-2 text-[12px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlerShow?.();
              }}
              className="border-b border-gray-300 p-2 hover:bg-gray-100/20 last:border-none"
            >
              Посмотреть
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlerDelete?.();
              }}
              className="border-b w-full border-gray-300 p-2 hover:bg-gray-100/20 last:border-none"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

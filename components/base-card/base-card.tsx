import { ReactNode } from "react";
type BaseCard = {
  children?: ReactNode;
  className?: string;
};

export function BaseCard({ children, className }: BaseCard) {
  return (
    <div
      className={
        " shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] bg-white rounded-[20px] p-5.5 " +
        className
      }
    >
      {children}
    </div>
  );
}

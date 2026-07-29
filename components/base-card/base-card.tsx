import { ReactNode } from "react";
type BaseCard = {
  children?: ReactNode;
  className?: string;
};

export function BaseCard({ children, className }: BaseCard) {
  return (
    <div className={"bg-white rounded-[20px] p-5.5 " + className}>
      {children}
    </div>
  );
}

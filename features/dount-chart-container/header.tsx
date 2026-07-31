import { BaseCard } from "@/components/base-card/base-card";

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <BaseCard
      className={
        "rounded-[40px] flex items-center justify-center max-w-[656px] py-4 " +
        (className ?? "")
      }
    >
      <div className="flex items-center justify-between text-[#222F3E] text-[18px] font-medium">
        <span className="w-[21px] h-[21px] bg-[#9A99F4] rounded-[8px] mr-2"></span>
        <div className="mr-2.5">Любимое </div>
        <span className="w-[21px] h-[21px] bg-[#9A99F4] rounded-[8px] mr-2"></span>
        <div className="mr-2.5">Любимое </div>
        <span className="w-[21px] h-[21px] bg-[#9A99F4] rounded-[8px] mr-2"></span>
        <div className="mr-2.5">Любимое </div>
        <span className="w-[21px] h-[21px] bg-[#9A99F4] rounded-[8px] mr-2"></span>
        <div>Любимое </div>
      </div>
    </BaseCard>
  );
}

import { SpringAnime } from "@/components/animations/spring-anim/spring-anim";

export function Chips({ children }: { children: React.ReactNode }) {
  return (
    <SpringAnime>
      <span className="inline-flex items-center rounded-full border border-black/10 bg-text-main/[0.03] px-3 py-1 text-xs text-text-main dark:text-white dark:bg-[#424549]">
        {children}
      </span>
    </SpringAnime>
  );
}

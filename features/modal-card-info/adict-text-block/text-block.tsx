import { UpAnim } from "@/components/animations/up-anim/up-anim";

export function TextBlock({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <UpAnim>
      <div className="rounded-xl border border-black/10 bg-white p-3 hover:border-text-primary transition-colors duration-150 dark:bg-[#484b4f]">
        <p className="text-xs text-black/55 mb-1 dark:text-white/70">{name}</p>
        <p className="text-sm font-semibold text-black/85 dark:text-white">{children}</p>
      </div>
    </UpAnim>
  );
}

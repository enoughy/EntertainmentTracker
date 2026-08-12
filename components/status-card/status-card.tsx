import { ContentStatus } from "@/types/content-status/content-status";
import { StatusCardAnim } from "./status-card-anim";
import { STATUS_COLORS } from "@/types/content-status/status-colors";

type StatusCardProps = {
  status: ContentStatus;
};
export function StatusCard({ status }: StatusCardProps) {
  const cardColor = STATUS_COLORS[status];
  return (
    <StatusCardAnim>
      <div
        style={{ "--card-color": cardColor } as React.CSSProperties}
        className={`flex justify-between items-center rounded-3xl py-1 px-3 bg-[var(--card-color)]/10 hover:bg-[var(--card-color)]/20 transition-colors duration-150`}
      >
        <div
          className={`w-2 h-2 rounded-2xl bg-[var(--card-color)] mr-2`}
        ></div>
        <div className={`text-[14px] text-[var(--card-color)]`}>{status}</div>
      </div>
    </StatusCardAnim>
  );
}

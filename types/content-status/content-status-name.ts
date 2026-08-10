import { ContentStatus } from "./content-status";
export const TYPE_NAME: Record<ContentStatus, string> = {
  completed: "Просмотренно",
  favorite: "Любимое",
  dropped: "Брошено",
  in_progress: "Просматриваю сейчас",
  planning: "В планах",
};

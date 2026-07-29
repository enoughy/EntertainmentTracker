import Image from "next/image";
import { BaseStatCard } from "@/features/base-stat-card/base-stat-card";

export default function Home() {
  return (
    <>
      <BaseStatCard
        name="Фильмы"
        countAll={120}
        countChange={5}
        proc={-4.1}
      ></BaseStatCard>
    </>
  );
}

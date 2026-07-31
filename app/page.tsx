"use client";
import Image from "next/image";
import { BaseStatCard } from "@/features/base-stat-card/base-stat-card";
import { DountChart } from "@/features/dount-chart/dount-chart";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { DountChartContainer } from "@/features/dount-chart-container/dount-chart-container";

const data: DountChartData = {
  data: [
    { name: "favorite", value: 20 },
    { name: "dropped", value: 10 },
    { name: "completed", value: 20 },
    { name: "planning", value: 70 },
    { name: "in_progress", value: 70 },
  ],
};
const arr = [data];

export default function Home() {
  return (
    <>
      <div className="p-8">
        <h1>Overview</h1>
        <div className="grid grid-cols-3">
          <BaseStatCard
            name="Фильмы"
            countAll={120}
            countChange={5}
            proc={-4.1}
          ></BaseStatCard>
          <BaseStatCard
            name="Фильмы"
            countAll={120}
            countChange={5}
            proc={-4.1}
          ></BaseStatCard>
          <BaseStatCard
            name="Фильмы"
            countAll={120}
            countChange={5}
            proc={-4.1}
          ></BaseStatCard>
        </div>
      </div>
    </>
  );
}

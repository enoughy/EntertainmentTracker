"use client";
import Image from "next/image";
import { BaseStatCard } from "@/features/base-stat-card/base-stat-card";
import { DountChart } from "@/features/dount-chart/dount-chart";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { DountChartContainer } from "@/features/dount-chart-container/dount-chart-container";
import { BarChartComp } from "@/features/bar-chart/bar-chart";

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
      <div className="p-12 text-text-gray text-[28px]">
        <h1 className="mb-10 text">Статистика трекера</h1>
        <div className="grid grid-cols-1 justify-items-center second:justify-items-normal first:justify-items-normal first:grid-cols-2 second:grid-cols-3 gap-y-7 ">
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
          <div className="col-span-1 second:col-span-2 first:col-span-2">
            <DountChartContainer data={arr}></DountChartContainer>
          </div>

          <BarChartComp></BarChartComp>
        </div>
      </div>
    </>
  );
}

"use client";
import Image from "next/image";
import { BaseStatCard } from "@/features/base-stat-card/base-stat-card";
import { DountChart } from "@/features/dount-chart/dount-chart";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
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

export default function Home() {
  return (
    <>
      <BaseStatCard
        name="Фильмы"
        countAll={120}
        countChange={5}
        proc={-4.1}
      ></BaseStatCard>
      <DountChart stat={data} name="Фильмы"></DountChart>
      <BarChartComp></BarChartComp>
    </>
  );
}

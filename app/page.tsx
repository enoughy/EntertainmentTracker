"use client";
import Image from "next/image";
import { BaseStatCard } from "@/features/base-stat-card/base-stat-card";
import { DountChart } from "@/features/dount-chart/dount-chart";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { DountChartContainer } from "@/features/dount-chart-container/dount-chart-container";
import { BarChartComp } from "@/features/bar-chart/bar-chart";
import { useEffect, useState } from "react";
import localforage from "localforage";
import { Content } from "@/types/entitys/media";
import { MediaBlock } from "@/types/entitys/media";

const data: DountChartData = {
  data: [
    { name: "favorite", value: 20 },
    { name: "dropped", value: 10 },
    { name: "completed", value: 20 },
    { name: "planning", value: 70 },
    { name: "in_progress", value: 70 },
  ],
};

function dountChartMapper(mb: MediaBlock): DountChartData {
  const chartData: DountChartData = { data: [] };
  for (let [k, v] of mb.contentStatusStatistic) {
    chartData.data.push({ name: k, value: v });
  }
  return chartData;
}

const arr = [data];

function BaseStatCardPlaceHolder() {
  return (
    <>
      <BaseStatCard
        name="Фильмы"
        countAll={0}
        proc={0}
        countChange={0}
      ></BaseStatCard>
      <BaseStatCard
        name="Фильмы"
        countAll={0}
        proc={0}
        countChange={0}
      ></BaseStatCard>
      <BaseStatCard
        name="Фильмы"
        countAll={0}
        proc={0}
        countChange={0}
      ></BaseStatCard>
    </>
  );
}
export default function Home() {
  const [content, setContent] = useState<Content | null>(null);
  let mediaBlockList: MediaBlock[] = [];

  useEffect(() => {
    const content = localforage.getItem<Content>("content").then((data) => {
      setContent(data);
      mediaBlockList = data?.getMediaBlocks() ?? [];
    });
  }, []);

  return (
    <>
      <div className="p-12 text-text-gray text-[28px]">
        <h1 className="mb-10 text">Статистика трекера</h1>
        <div className="grid grid-cols-1 justify-items-center second:justify-items-normal first:justify-items-normal first:grid-cols-2 second:grid-cols-3 gap-y-7 ">
          {mediaBlockList.length === 0 ? BaseStatCardPlaceHolder() : <></>}

          {mediaBlockList.map((item) => {
            return (
              <BaseStatCard
                name={item.typeId}
                countAll={item.count}
                countChange={item.countOfAddInMounth}
                proc={4}
              ></BaseStatCard>
            );
          })}
          <div className="col-span-1 second:col-span-2 first:col-span-2">
            <DountChartContainer data={arr}></DountChartContainer>
          </div>

          <BarChartComp></BarChartComp>
        </div>
      </div>
    </>
  );
}

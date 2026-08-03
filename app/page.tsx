"use client";
import { BaseStatCard } from "@/features/base-stat-card/base-stat-card";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { DountChartContainer } from "@/features/dount-chart-container/dount-chart-container";
import { BarChartComp } from "@/features/bar-chart/bar-chart";
import { Suspense, use, useEffect, useState } from "react";
import { BarChartData } from "@/features/bar-chart/bar-chart";
import { MONTHS_MAP } from "@/types/date/months";
import { useContent } from "@/features/content/hooks/useContent";
import { Media } from "@/features/content/entity/media";
import { MediaBlock } from "@/features/content/entity/mediaBlock";
import { barChartDataMapper } from "@/features/bar-chart/barChartDataMapper";
import { dountChartMapper } from "@/features/dount-chart-container/dountChartMappre";

// const data: DountChartData = {
//   data: [
//     { name: "favorite", value: 20 },
//     { name: "dropped", value: 10 },
//     { name: "completed", value: 20 },
//     { name: "planning", value: 70 },
//     { name: "in_progress", value: 70 },
//   ],
// };
//
// const arr = [data];

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
// const data: BarChartData = [
//   { mount: "Jan", value: 40 },
//   { mount: "Feb", value: 140 },
//   { mount: "Mar", value: 30 },
//   { mount: "Apr", value: 80 },
//   { mount: "Jun", value: 40 },
// ];

function procCalculate(item: MediaBlock): number {
  const currMonth = MONTHS_MAP.at(new Date().getMonth())!;
  const prevMonth = MONTHS_MAP.at(new Date().getMonth() - 1)!;
  const currVal = item.countAddedInMonths?.get(currMonth) ?? 0;
  const prevVal = item.countAddedInMonths?.get(prevMonth) ?? 0;
  const ret = ((currVal - prevVal) / prevVal) * 100;

  return Number.isFinite(ret) ? ret : 0;
}

export default function Home() {
  //const [content, setContent] = useState<Content | null>(null);
  const [mediaBlockList, setMediaBlockList] = useState<MediaBlock[]>([]);
  const [dountChartData, setDountCahrData] = useState<DountChartData[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartData>([]);
  const { content, addMedia, getMediaBlocks } = useContent();

  useEffect(() => {
    const currMediaBlockList = getMediaBlocks() ?? [];
    setMediaBlockList(currMediaBlockList);
    const dChData = currMediaBlockList.map((mb) => {
      return dountChartMapper(mb) ?? [];
    });
    console.log("dChData");
    console.log(dChData);
    setDountCahrData(dChData);
    setBarChartData(barChartDataMapper(content!));
  }, [content]);
  //     setMediaBlockList(currMediaBlockList);

  // useEffect(() => {
  //   localforage.getItem<ContentData>("content").then((data) => {
  //     if (data === null) {
  //       data = contentDataInit();
  //       localforage
  //         .setItem("content", data)
  //         .then(() =>
  //           console.log(
  //             "Объект отсутствовал. Создан и сохранен новый профиль.",
  //           ),
  //         );
  //     }
  //     const newContent = new Content(data);
  //     const currMediaBlockList = newContent.getMediaBlocks() ?? [];
  //     setMediaBlockList(currMediaBlockList);
  //     console.log(currMediaBlockList);
  //     const dChData = currMediaBlockList.map((mb) => {
  //       return dountChartMapper(mb) ?? [];
  //     });
  //     console.log(dChData);
  //     setDountCahrData(dChData);
  //     setContent(newContent);
  //     setBarChartData(barChartDataMapper(newContent));
  //   });
  // }, []);

  return (
    <>
      <div className="p-12 text-text-gray text-[28px]">
        <h1 className="mb-10 text">Статистика трекера</h1>
        <div className="grid grid-cols-1 justify-items-center second:justify-items-normal first:justify-items-normal first:grid-cols-2 second:grid-cols-3 gap-y-7 ">
          <Suspense fallback={<></>}>
            {mediaBlockList.map((item) => {
              return (
                <BaseStatCard
                  key={item.typeId}
                  name={item.typeId}
                  countAll={item.count}
                  countChange={
                    item.countAddedInMonths?.get(
                      MONTHS_MAP[new Date().getMonth()] ?? "January",
                    ) ?? 0
                  }
                  proc={procCalculate(item)}
                ></BaseStatCard>
              );
            })}
            <div className="col-span-1 second:col-span-2 first:col-span-2">
              <DountChartContainer data={dountChartData}></DountChartContainer>
            </div>

            <BarChartComp data={barChartData}></BarChartComp>
          </Suspense>
        </div>
      </div>
    </>
  );
}

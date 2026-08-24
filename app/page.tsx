"use client";
import { BaseStatCard } from "@/features/base-stat-card/base-stat-card";
import { DountChartData } from "@/types/dount-chart-stat/dount-chart-stat";
import { DountChartContainer } from "@/features/dount-chart-container/dount-chart-container";
import { BarChartComp } from "@/features/bar-chart/bar-chart";
import { useEffect, useState } from "react";
import { BarChartData } from "@/features/bar-chart/bar-chart";
import { MONTHS_MAP } from "@/types/date/months";
import { useContent } from "@/features/content/hooks/useContent";
import { MediaBlock } from "@/features/content/entity/mediaBlock";
import { barChartDataMapper } from "@/features/bar-chart/barChartDataMapper";
import { dountChartMapper } from "@/features/dount-chart-container/dountChartMappre";
import { AddedRecently } from "@/features/added-recetnly/added-recently";
import { Media } from "@/features/content/entity/media";

import { SpringAnime } from "@/components/animations/spring-anim/spring-anim";
import { PageInitAnim } from "@/components/animations/page-init-anim/page-init-anim";
import { procCalculate } from "@/features/content/services/procCalculate";

export default function Home() {
  const [mediaBlockList, setMediaBlockList] = useState<MediaBlock[]>([]);
  const [dountChartData, setDountCahrData] = useState<DountChartData[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartData>([]);
  const { content, mediaBlocks, deleteMedia, changeMedia } = useContent();

  useEffect(() => {
    const currMediaBlockList = mediaBlocks ?? [];
    setMediaBlockList(currMediaBlockList);
    const dChData = currMediaBlockList.map((mb) => {
      return dountChartMapper(mb) ?? [];
    });
    console.log("dChData");
    console.log(dChData);
    setDountCahrData(dChData);
    setBarChartData(barChartDataMapper(content!));
  }, [mediaBlocks, content]);

  function handlerDelete(item: Media) {
    deleteMedia(item.id!);
    console.log("delete");
  }

  function handleUpdate(updatedMovie: Media) {
    changeMedia(updatedMovie.id!, updatedMovie);
  }
  return (
    <>
      <div className="p-4 first:p-12 text-text-gray text-[28px]">
        <h1 className="mb-10 text dark:text-[rgba(255,255,255,0.8)]">Статистика трекера</h1>
        <PageInitAnim>
          <div className="grid grid-cols-1 second:justify-items-normal first:justify-items-normal first:grid-cols-2 second:grid-cols-3 gap-y-7 ">
            <div className="col-span-1 first:col-span-2 second:col-span-3 grid grid-cols-1 first:grid-cols-1 second:grid-cols-3">
              {mediaBlockList.map((item) => {
                return (
                  <SpringAnime key={item.typeId}>
                    <BaseStatCard
                      className=""
                      name={item.typeId}
                      countAll={item.count}
                      countChange={
                        item.countAddedInMonths?.get(
                          MONTHS_MAP[new Date().getMonth()] ?? "January",
                        ) ?? 0
                      }
                      proc={procCalculate(item)}
                    ></BaseStatCard>
                  </SpringAnime>
                );
              })}
            </div>
            <div className="col-span-1 second:col-span-2 first:col-span-2 flex items-center justify-center second:block">
              <DountChartContainer data={dountChartData}></DountChartContainer>
            </div>

            <div className="col-span-1 second:col-span-1 first:col-span-2">
              <BarChartComp data={barChartData}></BarChartComp>
            </div>
            <div className="col-span-1 second:col-span-3 first:col-span-2">
              <AddedRecently
                mediaList={content?.addedRecently.buffer ?? []}
                handlerDelete={handlerDelete}
                handleUpdate={handleUpdate}
              ></AddedRecently>
            </div>
          </div>
        </PageInitAnim>
      </div>
    </>
  );
}

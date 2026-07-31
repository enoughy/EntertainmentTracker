import { BaseCard } from "@/components/base-card/base-card";
import Image from "next/image";
import arrowUp from "@/img/image_1785353891368_0.png";
import { ArrowUp } from "@/img/svg/arrow-up/ArrowUp";
import { PlotUp } from "@/img/svg/plot-up/plot-up";
import { PlotDown } from "@/img/svg/plot-down/plot-down";
import { ArrowDown } from "@/img/svg/arrow-down/arrow-down";

type BaseStatCardProps = {
  name: string;
  countAll: number;
  countChange: number;
  proc: number;
};

export function BaseStatCard({
  name,
  countAll,
  countChange,
  proc,
}: BaseStatCardProps) {
  return (
    <BaseCard className="flex w-80.5 h-37.5 m-3 pt-[38px] justify-between">
      <div>
        <div className="text-[#898989]  text-[17px]">{name}</div>
        {/* All count in topic text*/}
        <div className="text-[28px] font-semibold leading-none mt-1.5">
          {countAll}
        </div>

        {/* count that change of time*/}
        <div className="text-[14px]">{"+" + countChange + " за месяц"}</div>

        {/* procent that change of time*/}
        <div className="text-[#898989] text-[14px] text-center relative">
          {proc > 0 ? (
            <ArrowUp className="mb-0.5 mr-0.5"></ArrowUp>
          ) : (
            <ArrowDown className="mb-0.5 mr-0.5"></ArrowDown>
          )}
          <span className={proc >= 0 ? "text-[#51AB5A]" : "text-[#CC3232]"}>
            {proc + "%"}
          </span>
          <span>{" from prev mounth"}</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {proc > 0 ? <PlotUp></PlotUp> : <PlotDown></PlotDown>}
      </div>
    </BaseCard>
  );
}

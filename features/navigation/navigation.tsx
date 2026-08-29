"use client";
import Film from "@/components/icons/film";
import Chart from "@/components//icons/chart";
import Series from "@/components/icons/series";
import Anime from "@/components/icons/clapperboard";
import Settings from "@/components/icons/settings";
import Link from "next/link";
import Help from "@/components/icons/help";

export default function () {
  return (
    <div className="hidden shadow-[inset_-6px_0_6px_-6px_rgba(0,0,0,0.04)] bg-gradient-to-b from-[#f5f7f9]/60 to-[#eceef2]/60 backdrop-blur-2xl border border-black/[0.04] rounded-l-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] lg:w-[332px] w-[200px] h-full md:flex flex-col shrink-0 px-4 py-6 dark:bg-gradient-to-b dark:from-[#1e2124]/70 dark:to-[#2A2E33]/70 dark:text-[rgba(255,255,255,0.8)]">
      <div className="flex items-center gap-3 px-3 mb-16">
        <div className="size-10 rounded-xl bg-white/60" />
        <div>
          <div className="text-[15px] font-semibold">Cinema</div>
          <div className="text-[12px] text-zinc-500 dark:text-zinc-200">
            Dashboard
          </div>
        </div>
      </div>
      <h2 className="px-3 mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-zinc-500 dark:text-[rgb(255,255,255)]">
        Меню
      </h2>
      <Link
        href="/"
        className="flex items-center gap-3 h-11 px-3 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-white/55 hover:text-zinc-900 transition-colors dark:text-[rgba(255,255,255,0.8)] dark:hover:bg-white/15 dark:hover:text-none"
      >
        <Chart />
        <span className="dark:text-[rgba(255,255,255,0.8)]">Статистика</span>
      </Link>

      <Link
        href="/Movie"
        className="flex items-center gap-3 h-11 px-3 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-white/55 hover:text-zinc-900 transition-colors dark:text-[rgba(255,255,255,0.8)] dark:hover:bg-white/15 dark:hover:text-white/80"
      >
        <Film />
        <span>Фильмы</span>
      </Link>

      <Link
        href="/Series"
        className="flex items-center gap-3 h-11 px-3 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-white/55 hover:text-zinc-900 transition-colors dark:text-[rgba(255,255,255,0.8)] dark:hover:bg-white/15 dark:hover:text-white/80"
      >
        <Series />
        <span>Сериалы</span>
      </Link>

      <Link
        href="/Anime"
        className="flex items-center gap-3 h-11 px-3 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-white/55 hover:text-zinc-900 transition-colors dark:text-[rgba(255,255,255,0.8)] dark:hover:bg-white/15 dark:hover:text-white/80"
      >
        <Anime />
        <span>Аниме</span>
      </Link>

      <div className="h-px bg-black/5 my-4" />
      <h2 className="px-3 mt-6 mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-zinc-500 dark:text-[rgb(255,255,255)]">
        Другое
      </h2>

      <Link
        href="/Settings"
        className="flex items-center gap-3 h-11 px-3 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-white/55 hover:text-zinc-900 transition-colors dark:text-[rgba(255,255,255,0.8)] dark:hover:bg-white/15 dark:hover:text-white/80"
      >
        <Settings />
        <span>Настройки</span>
      </Link>

      <Link
        href="/Help"
        className="flex items-center gap-3 h-11 px-3 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-white/55 hover:text-zinc-900 transition-colors dark:text-[rgba(255,255,255,0.8)] dark:hover:bg-white/15 dark:hover:text-white/80"
      >
        <Help />
        <span>Контакты</span>
      </Link>
    </div>
  );
}

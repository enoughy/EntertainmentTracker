"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PageNaveItem } from "./page-nav-item";

export function PageNav() {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className="flex items-center border-b-2 pl-3 py-2 text-text-main/15 text-[17px]">
      <Link
        href="/"
        className="px-4 py-2 rounded-2xl hover:bg-white flex items-center"
      >
        <h1 className=" text-text-gray-2 ">Tracker</h1>
      </Link>
      <PageNaveItem pathName={pathName}></PageNaveItem>
    </div>
  );
}

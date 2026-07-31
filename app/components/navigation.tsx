import Film from "./icons/film";
import Chart from "./icons/chart";
import Series from "./icons/series";
import Anime from "./icons/clapperboard";
import Settings from "./icons/settings";
import Link from "next/link";
import Help from "./icons/help";

export default function () {
  return (
    <div className="bg-[#36393e] w-[332px] h-[100%] flex flex-col gap-[30px] justify-center font-sans text-[white] text-[22px] navigation">
      <h2>Menu</h2>
      <Link href="/">
        <div className="card">
          <Chart />
          Overview
        </div>
      </Link>
      <Link href="/Movie">
        <div className="card">
          <Film />
          Movie
        </div>
      </Link>
      <Link href="/Series">
        <div className="card">
          <Series />
          Series
        </div>
      </Link>
      <Link href="/Anime">
        <div className="card">
          <Anime />
          Anime
        </div>
      </Link>
      <h2>Other</h2>
      <Link href="/Settings">
        <div className="card">
          <Settings />
          Settings
        </div>
      </Link>
      <Link href="/Help">
        <div className="card">
          <Help />
          Contacts
        </div>
      </Link>
    </div>
  );
}


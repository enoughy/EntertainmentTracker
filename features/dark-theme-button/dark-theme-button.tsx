"use client";
import { useState } from "react";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";

export function DarkThemeButton() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  function swapTheme() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <div className="flex ml-[5px] text-[30px]">
      {isDarkTheme ? (
        <button className="cursor-pointer text-gray" onClick={swapTheme}>
          <FiSun className="text-white/60 " />
        </button>
      ) : (
        <button className="cursor-pointer" onClick={swapTheme}>
          <FaRegMoon className="text-text-main" />
        </button>
      )}
    </div>
  );
}

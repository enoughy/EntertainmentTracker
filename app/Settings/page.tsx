import { DarkThemeButton } from "@/features/dark-theme-button/dark-theme-button";

export default function Settings() {
  return (
    <>
      <div className="flex p-3">
        <span className="text-text-main dark:text-white text-2xl mr-1">
          Изменить тему:
        </span>
        <DarkThemeButton></DarkThemeButton>
      </div>
    </>
  );
}

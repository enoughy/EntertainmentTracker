import { Chips } from "../chips";

export function GenersBlock({ genres }: { genres: string[] }) {
  return (
    <div className="mb-3">
      <p className="text-xs text-black/55 mb-2 dark:text-white">Жанры</p>
      <div className="flex flex-wrap gap-2 ">
        {genres.map((g, index) => (
          <Chips key={index}>{g}</Chips>
        ))}
      </div>
    </div>
  );
}

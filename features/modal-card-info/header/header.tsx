export function Header({
  sectionId,
  setSectionId,
}: {
  sectionId: number;
  setSectionId: Function;
}) {
  return (
    <div className="flex justify-start gap-5 text-sm rounded- border-b border-text-main/30 px-2 pb-3 mb-6">
      <h1
        onClick={() => setSectionId(0)}
        className="px-1 rounded cursor-pointer transition-colors duration-200"
        style={
          sectionId === 0
            ? { borderBottom: "4px solid var(--color-text-primary)" }
            : {}
        }
      >
        Тайтл
      </h1>
      <h1
        className="px-1 rounded cursor-pointer transition-colors duration-200"
        style={
          sectionId === 1
            ? { borderBottom: "4px solid var(--color-text-primary)" }
            : {}
        }
        onClick={() => setSectionId(1)}
      >
        Дополнительная информация
      </h1>
    </div>
  );
}

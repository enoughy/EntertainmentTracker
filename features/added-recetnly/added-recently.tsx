import { BaseCard } from "@/components/base-card/base-card";
import { Table } from "./table/table";

export function AddedRecently() {
  return (
    <BaseCard>
      <h1>Недавно добавлены</h1>
      <Table></Table>
    </BaseCard>
  );
}

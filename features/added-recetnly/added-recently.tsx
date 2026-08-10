import { BaseCard } from "@/components/base-card/base-card";
import { Table } from "./table/table";
import { Media } from "../content/entity/media";

type AddedRecently = {
  mediaList: Media[];
};

export function AddedRecently({ mediaList }: AddedRecently) {
  return (
    <BaseCard>
      <h1 className="text-text-primary mb-8">Недавно добавлены</h1>
      <Table mediaList={mediaList}></Table>
    </BaseCard>
  );
}

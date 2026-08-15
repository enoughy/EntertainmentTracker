import { BaseCard } from "@/components/base-card/base-card";
import { Table } from "./table/table";
import { Media } from "../content/entity/media";
import { UpAnim } from "@/components/animations/up-anim/up-anim";
import ModalMediaViewer from "../modal-card-info/modal-card-info";
import { useState } from "react";

type AddedRecently = {
  mediaList: Media[];
  handlerDelete: (item: Media) => void;
};

export function AddedRecently({ mediaList, handlerDelete }: AddedRecently) {
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [selectMedia, setSelectMedia] = useState<Media>();

  function handleClick(item: Media) {
    setSelectMedia(item);
    setIsOpenCard(true);
  }

  const handleUpdateMovie = (updatedMovie: Media) => {};

  return (
    <>
      <UpAnim>
        <BaseCard>
          <h1 className="text-text-primary mb-8">Недавно добавлены</h1>
          <Table
            onClick={handleClick}
            mediaList={mediaList}
            handlerDelete={handlerDelete}
          ></Table>
        </BaseCard>
      </UpAnim>

      <ModalMediaViewer
        isOpenCard={isOpenCard}
        setIsOpenCard={setIsOpenCard}
        movie={selectMedia!}
        onUpdate={handleUpdateMovie}
      ></ModalMediaViewer>
    </>
  );
}

import {
  getAllByTestId,
  render,
  renderHook,
  act,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { useContent } from "./useContent";
import { testMediaList } from "@/tests/test-data/mediaList";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { beforeEach, afterEach } from "vitest";
import { getMediaById } from "../bd/mediaRepository";
import { db } from "../bd/bd";
import { MONTHS_MAP } from "@/types/date/months";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";
import { MediaBlock } from "../entity/mediaBlock";
import { Media } from "../entity/media";
import { ContentData } from "../entity/ContentData";

function getTestMediaBlock(
  mediaBlocks: MediaBlock[] | null | undefined,
): MediaBlock | undefined {
  return mediaBlocks?.find((md) => md.typeId === testMediaList[0].contentType);
}

function getTestMediaBlockMedia(
  mediaBlocks: MediaBlock[] | null | undefined,
  media: Media,
): MediaBlock | undefined {
  return mediaBlocks?.find((md) => md.typeId === media.contentType);
}

function getcountAddedInMonthsByMedia(
  mediaBlocks: MediaBlock[] | null | undefined,
  media: Media,
): number | undefined {
  return getTestMediaBlock(mediaBlocks)?.countAddedInMonths.get(
    MONTHS_MAP[media.dateOfAdd.getMonth()],
  );
}

function getcountAddedInContent(
  content: ContentData | null | undefined,
  media: Media,
): number | undefined {
  return content?.countAddedInMonths.get(
    MONTHS_MAP[media.dateOfAdd.getMonth()],
  );
}

describe("use content hook", () => {
  beforeEach(async () => {
    await db.media.clear();
    await db.mediaBlock.clear();
    await db.content.clear();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  describe("add media", () => {
    it("addMedia check db", async () => {
      const { result } = renderHook(() => useContent());

      await act(async () => {
        await result.current.addMedia(testMediaList[0]);
      });

      const media = await getMediaById(testMediaList[0].id!);

      expect(media).toEqual(testMediaList[0]);

      await waitFor(() => {
        expect(
          result.current.mediaBlocks?.find(
            (md) => md.typeId === testMediaList[0].contentType,
          )?.mediaList[0],
        ).toEqual(testMediaList[0]);
      });
    });

    it("statistic after addMedia in Media Block", async () => {
      const { result } = renderHook(() => useContent());

      await act(async () => {
        await result.current.addMedia(testMediaList[0]);
      });

      await waitFor(() => {
        expect(
          result.current.mediaBlocks
            ?.find((md) => md.typeId === testMediaList[0].contentType)
            ?.contentStatusStatistic.get(testMediaList[0].contentStatus),
        ).toEqual(1);
      });

      await waitFor(() => {
        expect(
          result.current.mediaBlocks?.find(
            (md) => md.typeId === testMediaList[0].contentType,
          )?.count,
        ).toEqual(1);
      });

      await waitFor(() => {
        expect(
          result.current.mediaBlocks?.find(
            (md) => md.typeId === testMediaList[0].contentType,
          )?.count,
        ).toEqual(1);
      });

      await waitFor(() => {
        expect(
          getcountAddedInMonthsByMedia(
            result.current.mediaBlocks,
            testMediaList[0],
          ),
        ).toEqual(1);
      });
    });
    it("content status statistic after add", async () => {
      const { result } = renderHook(() => useContent());

      await act(async () => {
        await result.current.addMedia(testMediaList[0]);
      });

      await waitFor(() => {
        expect(
          result.current.content?.countAddedInMonths.get(
            MONTHS_MAP[testMediaList[0].dateOfAdd.getMonth()],
          ),
        ).toEqual(1);
      });
      await waitFor(() => {
        expect(result.current.content?.addedRecently.buffer[0]).toEqual(
          testMediaList[0],
        );
      });
    });
    it("content test shift buffer max size", async () => {
      const { result } = renderHook(() => useContent());

      for (let i = 0; i < 6; i++) {
        await act(async () => {
          await result.current.addMedia(testMediaList[i]);
        });
      }
      await waitFor(() => {
        expect(result.current.content?.addedRecently.buffer.length).toEqual(5);
        expect(result.current.content?.addedRecently.getValues()).toEqual(
          testMediaList.slice(1, 6), // order is taken into account
        );
      });
    });
  });
  describe("delete media", () => {
    const { result } = renderHook(() => useContent());

    beforeEach(async () => {
      await act(async () => {
        await result.current.addMedia(testMediaList[0]);
      });

      let media = await getMediaById(testMediaList[0].id!);

      expect(media).toEqual(testMediaList[0]);

      await act(async () => {
        await result.current.deleteMedia(testMediaList[0].id!);
      });
    });

    it("check delete in db", async () => {
      const media = await getMediaById(testMediaList[0].id!);

      expect(media).toEqual(undefined);
    });

    it("check delete in mediaBlocks state", async () => {
      waitFor(() => {
        expect(
          result.current.mediaBlocks?.find((md) => {
            md.typeId === testMediaList[0].contentType;
          })?.mediaList.length,
        ).toEqual(0);
      });
    });

    it("check mediaBlocks statistic", async () => {
      waitFor(() => {
        expect(
          getTestMediaBlock(
            result.current.mediaBlocks!,
          )?.contentStatusStatistic.get(testMediaList[0].contentStatus),
        ).toEqual(0);

        expect(
          getcountAddedInMonthsByMedia(
            result.current.mediaBlocks!,
            testMediaList[0],
          ),
        ).toEqual(0);

        expect(getTestMediaBlock(result.current.mediaBlocks)?.count).toEqual(0);
      });
    });

    it("check content statistic", async () => {
      waitFor(() => {
        expect(result.current.content?.addedRecently.buffer.length).toEqual(0);

        expect(
          getcountAddedInContent(result.current.content, testMediaList[0]),
        ).toEqual(0);
      });
    });
  });

  describe("change media", () => {
    const { result } = renderHook(() => useContent());

    beforeEach(async () => {
      await act(async () => {
        await result.current.addMedia(testMediaList[0]);
      });

      let media = await getMediaById(testMediaList[0].id!);

      expect(media).toEqual(testMediaList[0]);

      await act(async () => {
        await result.current.changeMedia(
          testMediaList[0].id!,
          testMediaList[1],
        );
      });
    });

    it("change in db", async () => {
      const media = await getMediaById(testMediaList[0].id!);
      waitFor(() => {
        expect(media).toEqual(testMediaList[0]);
      });
    });

    it("change in state", () => {
      waitFor(() => {
        expect(
          getTestMediaBlockMedia(result.current.mediaBlocks, testMediaList[1]),
        ).toEqual(testMediaList[1]);
      });
    });
  });
});

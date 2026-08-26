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

describe("use content hook", () => {
  beforeEach(async () => {
    await db.media.clear();
    await db.mediaBlock.clear();
    await db.content.clear();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("addMedia", async () => {
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

  it("correct statistic after addMedia in Media Block", async () => {
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
        result.current.mediaBlocks
          ?.find((md) => md.typeId === testMediaList[0].contentType)
          ?.countAddedInMonths.get(
            MONTHS_MAP[testMediaList[0].dateOfAdd.getMonth()],
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

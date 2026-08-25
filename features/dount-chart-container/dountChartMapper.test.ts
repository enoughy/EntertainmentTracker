import { getAllByTestId, render, screen, within } from "@testing-library/react";
import { dountChartMapper } from "./dountChartMappre";
import { testMediaList } from "@/tests/test-data/mediaList";
import "@testing-library/jest-dom/vitest";
import { MediaBlock } from "../content/entity/mediaBlock";
import { ContentType } from "@/types/content-type/contentType";
import { ContentStatus } from "@/types/content-status/content-status";
import { Months } from "@/types/date/months";
import { describe, it, expect } from "vitest";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { STATUS_NAME } from "@/types/content-status/content-status-name";

const testMediaBlock: MediaBlock = {
  typeId: "VIDEO" as ContentType,
  id: 1,
  mediaList: [],
  count: 128,
  countAddedInMonths: new Map<Months, number>([
    ["Январь" as Months, 12],
    ["Февраль" as Months, 18],
    ["Март" as Months, 25],
    ["Апрель" as Months, 20],
    ["Май" as Months, 31],
    ["Июнь" as Months, 22],
  ]),
  contentStatusStatistic: new Map<ContentStatus, number>([
    ["favorite" as ContentStatus, 84],
    ["in_progress" as ContentStatus, 17],
    ["planning" as ContentStatus, 21],
    ["dropped" as ContentStatus, 6],
  ]),
};

describe("dount chart mapper", () => {
  it("data", () => {
    expect(dountChartMapper(testMediaBlock)).toEqual({
      data: [
        { name: "favorite", value: 84 },
        { name: "in_progress", value: 17 },
        { name: "planning", value: 21 },
        { name: "dropped", value: 6 },
      ],
    });
  });
});

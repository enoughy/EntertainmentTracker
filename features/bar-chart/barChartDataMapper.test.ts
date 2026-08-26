import { getAllByTestId, render, screen, within } from "@testing-library/react";
import { testMediaList } from "@/tests/test-data/mediaList";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { STATUS_NAME } from "@/types/content-status/content-status-name";
import { barChartDataMapper } from "./barChartDataMapper";
import { ContentData } from "../content/entity/ContentData";
import { shiftBuff } from "../content/adictStruct/shiftBuffer";
const testContentData: ContentData = {
  id: 0,
  addedRecently: new shiftBuff(),
  countAddedInMonths: new Map([
    ["January", 12],
    ["February", 8],
    ["March", 15],
    ["April", 6],
    ["May", 10],
    ["June", 4],
    ["July", 18],
    ["August", 7],
    ["September", 11],
    ["October", 9],
    ["November", 14],
    ["December", 20],
  ]),
};
describe("bar chart data mapper", () => {
  it("test 1", () => {
    expect(barChartDataMapper(testContentData)).toEqual([
      { mount: "March", value: 15 },
      { mount: "April", value: 6 },
      { mount: "May", value: 10 },
      { mount: "June", value: 4 },
      { mount: "July", value: 18 },
      { mount: "August", value: 7 },
    ]);
  });
});

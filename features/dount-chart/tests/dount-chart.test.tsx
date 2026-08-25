import { getAllByTestId, render, screen, within } from "@testing-library/react";
import { DountChart } from "../dount-chart";
import { testMediaList } from "@/tests/test-data/mediaList";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { ContentStatus } from "@/types/content-status/content-status";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { STATUS_NAME } from "@/types/content-status/content-status-name";

const testDountChartData = {
  data: [
    {
      name: "favorite" as ContentStatus,
      value: 245,
    },
    {
      name: "in_progress" as ContentStatus,
      value: 38,
    },
    {
      name: "planning" as ContentStatus,
      value: 72,
    },
    {
      name: "dropped" as ContentStatus,
      value: 15,
    },
  ],
};

describe("dount chart", () => {
  it("check no data", () => {
    render(<DountChart name="test" stat={{ data: [] }}></DountChart>);
    expect(screen.getByText("Данных нет")).toBeInTheDocument;
  });
  it("check name", () => {
    render(<DountChart name="Name" stat={{ data: [] }}></DountChart>);

    expect(screen.getByText("Name")).toBeInTheDocument;
  });
});

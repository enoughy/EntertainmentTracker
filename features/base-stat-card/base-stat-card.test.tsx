import { getAllByTestId, render, screen, within } from "@testing-library/react";
import { BaseStatCard } from "./base-stat-card";
import { testMediaList } from "@/tests/test-data/mediaList";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { STATUS_NAME } from "@/types/content-status/content-status-name";

const testProps = {
  name: "Всего пользователей",
  countAll: 1250,
  countChange: 85,
  proc: 7.3,
  className: "users-card",
};

describe("base stat card tests", () => {
  it("test correct show props data in element", () => {
    render(<BaseStatCard {...testProps}></BaseStatCard>);
    expect(screen.getByText(testProps.name)).toBeInTheDocument;

    expect(screen.getByText(testProps.countAll)).toBeInTheDocument;

    expect(screen.getByText(new RegExp(String(testProps.countChange), "i")))
      .toBeInTheDocument;

    expect(screen.getByText(new RegExp(String(testProps.proc), "i")))
      .toBeInTheDocument;
  });
});

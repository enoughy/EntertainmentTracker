import { getAllByTestId, render, screen, within } from "@testing-library/react";
import { PageNav } from "../page-nav";
import { testMediaList } from "@/tests/test-data/mediaList";
import "@testing-library/jest-dom/vitest";
import { vi, describe, it, expect } from "vitest";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { STATUS_NAME } from "@/types/content-status/content-status-name";
import { PATH_NAME } from "@/types/path-name/pathName";

const mocks = vi.hoisted(() => ({
  usePathname: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: mocks.usePathname,
}));

describe("page nav", () => {
  it("test Movie text show", () => {
    mocks.usePathname.mockReturnValue("/Movie");
    render(<PageNav></PageNav>);
    expect(screen.getByText(PATH_NAME["/Movie"]));
  });
  it("test Anime text show", () => {
    mocks.usePathname.mockReturnValue("/Anime");
    render(<PageNav></PageNav>);

    expect(screen.getByText(PATH_NAME["/Anime"]));
  });
  it("test Series text show", () => {
    mocks.usePathname.mockReturnValue("/Series");
    render(<PageNav></PageNav>);

    expect(screen.getByText(PATH_NAME["/Series"]));
  });
});

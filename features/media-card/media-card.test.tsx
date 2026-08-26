import { getAllByTestId, render, screen, within } from "@testing-library/react";
import { MediaCard } from "./media-card";
import { testMediaList } from "@/tests/test-data/mediaList";
import "@testing-library/jest-dom/vitest";
import { vi, describe, it, expect } from "vitest";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { STATUS_NAME } from "@/types/content-status/content-status-name";

describe("Media card", () => {
  it("check props show", () => {
    render(<MediaCard title={testMediaList[0]}></MediaCard>);
    expect(screen.getByText(new RegExp(testMediaList[0].name, "i")));
    expect(
      screen.getByText(
        new RegExp(STATUS_NAME[testMediaList[0].contentStatus], "i"),
      ),
    );
  });
  it("check click", async () => {
    const user = userEvent.setup();

    const handleClick = vi.fn();
    render(
      <MediaCard title={testMediaList[0]} onClick={handleClick}></MediaCard>,
    );

    await user.click(screen.getByText(testMediaList[0].name));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

import { getAllByTestId, render, screen, within } from "@testing-library/react";
import { AddedRecently } from "../added-recently";
import { testMediaList } from "@/tests/test-data/mediaList";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { STATUS_NAME } from "@/types/content-status/content-status-name";

function handleDelete() {
  console.log("delete");
}
function handleUppdate() {
  console.log("uppdate");
}
describe("Added recently component", () => {
  beforeEach(() => {
    render(
      <AddedRecently
        mediaList={testMediaList}
        handlerDelete={handleDelete}
        handleUpdate={handleUppdate}
      ></AddedRecently>,
    );
  });
  it("is title exist", () => {
    expect(screen.getByText("Недавно добавлены")).toBeInTheDocument();
  });

  it("count of data", () => {
    const tableItems = screen.getAllByTestId("table-item");
    expect(tableItems.length).toEqual(testMediaList.length);
  });

  it("menuClick", async () => {
    const user = userEvent.setup();
    const menu = screen.getAllByTestId("menu")[0];

    expect(screen.getAllByText("Посмотреть")[0]).not.toBeVisible();

    await user.click(menu);
    expect(screen.getAllByText("Посмотреть")[0]).toBeVisible();
  });

  it("card click", async () => {
    const user = userEvent.setup();

    const item = screen.getAllByTestId("table-item")[0];
    await user.click(item);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("ckeck inf", () => {
    const item = screen.getAllByTestId("table-item")[0];
    expect(within(item).getByText(testMediaList[0].name)).toBeInTheDocument();
    expect(
      within(item).getByText(STATUS_NAME[testMediaList[0].contentStatus]),
    ).toBeInTheDocument();
    expect(
      within(item).getByText(
        testMediaList[0].genres[0] + " " + testMediaList[0].genres[1],
      ),
    ).toBeInTheDocument();
  });
});

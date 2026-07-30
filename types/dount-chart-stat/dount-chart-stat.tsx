import { ContentStatus } from "../content-status/content-status";

export type statCount = {
  name: ContentStatus;
  value: number;
};

export type DountChartData = {
  data: statCount[];
};

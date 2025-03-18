import { renderWithProviders } from "../../../../../testUtil";
//import Pie from "./Pie";

import {
  cleanup,
  fireEvent,
  screen,
  render,
  wait,
} from "@testing-library/react";
import TeamDashboard from "../../teamDashboard";

afterEach(cleanup);

test("Render TeamData component", () => {
  const { container } = renderWithProviders(<TeamDashboard />, {});
  expect(container).toMatchSnapshot();
});

const Chart = () => null;

jest.mock("react-apexcharts", () => Chart);

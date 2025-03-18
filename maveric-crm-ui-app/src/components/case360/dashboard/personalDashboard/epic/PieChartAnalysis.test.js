import renderWithRedux from "../../../../../testUtil";
import { cleanup } from "@testing-library/react";
import PieChartAnalysis from "../PieChartAnalysis";

const Chart = () => null;
jest.mock("react-apexcharts", () => Chart);

afterEach(cleanup);

test("Render pie charts", () => {
  const container = renderWithRedux(<PieChartAnalysis category={"Test"} />, {});
  expect(container).toMatchSnapshot();
});

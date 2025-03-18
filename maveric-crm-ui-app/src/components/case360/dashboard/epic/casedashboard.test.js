import renderWithRedux from "../../../../testUtil";
import { cleanup } from "@testing-library/react";
import CaseDashboard from "../index";
import TeamDashboard from "../teamDashboard/index";

const Chart = () => null;
jest.mock("react-apexcharts", () => Chart);

afterEach(cleanup);

test("Render Case Dashboard container", () => {
  const container = renderWithRedux(<CaseDashboard />, {});
  expect(container).toMatchSnapshot();
});

test("Render Case TeamDashboard container", () => {
    const container = renderWithRedux(<TeamDashboard />, {});
    expect(container).toMatchSnapshot();
  });

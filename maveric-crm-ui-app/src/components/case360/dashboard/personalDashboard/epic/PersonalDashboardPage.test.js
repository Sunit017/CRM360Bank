import renderWithRedux from "../../../../../testUtil";
import { cleanup } from "@testing-library/react";
import PersonalDashboard from "../index";

const Chart = () => null;
jest.mock("react-apexcharts", () => Chart);

afterEach(cleanup);

test("Render personal dashboard page", () => {
  const container = renderWithRedux(<PersonalDashboard />, {});
  expect(container).toMatchSnapshot();
});

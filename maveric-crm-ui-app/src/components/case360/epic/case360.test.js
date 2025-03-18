import renderWithRedux from "../../../testUtil";
import { cleanup } from "@testing-library/react";
import Case360 from "../index";

const Chart = () => null;
jest.mock("react-apexcharts", () => Chart);

afterEach(cleanup);

test("Render Case 360 container", () => {
  const container = renderWithRedux(<Case360 />, {});
  expect(container).toMatchSnapshot();
});
import renderWithRedux from "../../../../../testUtil";
import { cleanup } from "@testing-library/react";
import CasesByStatus from "../CasesByStatus";
afterEach(cleanup);

test("Render case status container", () => {
  const container = renderWithRedux(<CasesByStatus count={{}} />, {});
  expect(container).toMatchSnapshot();
});

import renderWithRedux from "../../../../../testUtil";
import { cleanup, userEvent, screen } from "@testing-library/react";
import QuickActionItems from "../QuickActionItems";
afterEach(cleanup);

test("Render case status container", () => {
  const container = renderWithRedux(<QuickActionItems />, {});
  expect(container).toMatchSnapshot();
});

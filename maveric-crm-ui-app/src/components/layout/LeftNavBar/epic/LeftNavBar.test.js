import renderWithRedux from "../../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import LeftNavBar from "../index";

afterEach(cleanup);
test("Render Left Navigation bar container", () => {
  const container = renderWithRedux(<LeftNavBar />, {});
  expect(container).toMatchSnapshot();
});

// test("click navigate to dashboard icon", () => {
//   const container = renderWithRedux(<LeftNavBar />, {});
//   fireEvent.click(screen.getByTestId("dashboard-icon"));
//   expect(container.queryByText("gotoNavigation")).toHaveBeenCalled;
//   expect(container.queryByText("gotoCase360NavUrl")).toHaveBeenCalled;
//   expect(container.queryByText("handleClose")).toHaveBeenCalled;
// });

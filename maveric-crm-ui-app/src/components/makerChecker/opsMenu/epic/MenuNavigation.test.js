import renderWithRedux from "../../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import MenuNavigation from "../index";

afterEach(cleanup);

test("Render maker checker menu container", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  expect(container).toMatchSnapshot();
});

test("click on Maker Checker dropdown button", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  fireEvent.click(screen.getByTestId("MakerCheckerDropdown"));
  expect(container.queryByText("onshowMenu")).toHaveBeenCalled;
  expect(container.queryByText("setEleE1")).toHaveBeenCalled;
});

test("click on Case Assign menu item button", () => {
  const selectedMenu = jest.fn();
  const container = renderWithRedux(
    <MenuNavigation selectedMenu={selectedMenu} />,
    {}
  );
  fireEvent.click(screen.getByTestId("MakerCheckerDropdown"));
  expect(container.queryByText("handleMakerCheckerClose")).toHaveBeenCalled;
});

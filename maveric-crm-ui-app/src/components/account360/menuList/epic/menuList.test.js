import MenuNavigation from "../MenuNavigation";
import renderWithRedux from "../../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";

afterEach(cleanup);

test("Render menu navigation container", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  expect(container).toMatchSnapshot();
});

test("click on Account360 dropdown button", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  fireEvent.click(screen.getByTestId("Account360Dropdown"));
  expect(screen.getByText("Account Details")).toBeInTheDocument;
});

test("click on Maker Checker dropdown button", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  fireEvent.click(screen.getByTestId("MakerCheckerDropdown"));
  expect(screen.getByText("Make Deposit Withdrawal")).toBeInTheDocument;
});

test("click on Account Details menu item", () => {
  const selectedMenu = jest.fn();
  const container = renderWithRedux(
    <MenuNavigation selectedMenu={selectedMenu} />,
    {}
  );
  fireEvent.click(screen.getByTestId("Account360Dropdown"));
  fireEvent.click(screen.getByTestId("AccountDetailsMenuItem"));
  expect(screen.getByText("Account Details")).not.toBeInTheDocument;
  expect(selectedMenu).toHaveBeenCalledTimes(1);
});

test("click on Card Details menu item", () => {
  const selectedMenu = jest.fn();
  const container = renderWithRedux(
    <MenuNavigation selectedMenu={selectedMenu} />,
    {}
  );
  fireEvent.click(screen.getByTestId("Account360Dropdown"));
  fireEvent.click(screen.getByTestId("CardDetailsMenuItem"));
  expect(screen.getByText("Card Details")).not.toBeInTheDocument;
  expect(selectedMenu).toHaveBeenCalledTimes(1);
});

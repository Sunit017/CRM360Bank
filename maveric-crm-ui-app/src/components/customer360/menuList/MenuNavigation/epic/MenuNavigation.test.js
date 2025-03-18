import renderWithRedux from "../../../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import MenuNavigation from "../index";

afterEach(cleanup);

test("Render customer 360 menu list container", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  expect(container).toMatchSnapshot();
});

test("click on Customer 360 dropdown button", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  fireEvent.click(screen.getByTestId("Customer360Dropdown"));
  expect(screen.getByText("Customer Details")).toBeInTheDocument;
  expect(screen.getByText("Business Address")).toBeInTheDocument;
  expect(container.queryByText("onshowCustomer360Menu")).toHaveBeenCalled;
  expect(container.queryByText("setEleE1")).toHaveBeenCalled;
});

test("click on Account 360 dropdown button", () => {
  const selectedMenu = jest.fn();
  const container = renderWithRedux(
    <MenuNavigation selectedMenu={selectedMenu} />,
    {}
  );
  fireEvent.click(screen.getByTestId("Account360Dropdown"));
  expect(container.queryByText("onshowAccount360Menu")).toHaveBeenCalled;
  expect(selectedMenu).toHaveBeenCalledTimes(1);
});

test("click on Case 360 dropdown button", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  fireEvent.click(screen.getByTestId("Case360Dropdown"));
  expect(screen.getByText("Cases")).toBeInTheDocument;
  expect(container.queryByText("onshowCase360Menu")).toHaveBeenCalled;
  expect(container.queryByText("setEleE2")).toHaveBeenCalled;
});

test("click on Call Contact History Dropdown button", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  fireEvent.click(screen.getByTestId("CallContactHistoryDropdown"));
  expect(container.queryByText("onshowCallContactMenu")).toHaveBeenCalled;
  expect(container.queryByText("setEleE3")).toHaveBeenCalled;
});

test("click on Chat Contact History Dropdown button", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  fireEvent.click(screen.getByTestId("ChatContactHistoryDropdown"));
  expect(container.queryByText("onshowChatContactMenu")).toHaveBeenCalled;
  expect(container.queryByText("setEleE4")).toHaveBeenCalled;
});

test("click on Customer360 Menu Items button", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  fireEvent.click(screen.getByTestId("Customer360Dropdown"));
  fireEvent.click(screen.getByTestId("customer360-menu"));
  expect(container.queryByText("handleCustomer360Close")).toHaveBeenCalled;
});

test("click on Case 360 Menu Item button", () => {
  const selectedMenu = jest.fn();
  const container = renderWithRedux(
    <MenuNavigation selectedMenu={selectedMenu} />,
    {}
  );
  fireEvent.click(screen.getByTestId("Case360Dropdown"));
  fireEvent.click(screen.getByTestId("CasesMenuItem"));
  expect(container.queryByText("handleCase360Close")).toHaveBeenCalled;
});

test("click on Call History Menu Item button", () => {
  const selectedMenu = jest.fn();
  const container = renderWithRedux(
    <MenuNavigation selectedMenu={selectedMenu} />,
    {}
  );
  fireEvent.click(screen.getByTestId("CallContactHistoryDropdown"));
  fireEvent.click(screen.getByTestId("CallHistoryMenuItem"));
  expect(container.queryByText("handleCallContactClose")).toHaveBeenCalled;
});

test("click on Chat History Menu Item button", () => {
  const selectedMenu = jest.fn();
  const container = renderWithRedux(
    <MenuNavigation selectedMenu={selectedMenu} />,
    {}
  );
  fireEvent.click(screen.getByTestId("ChatContactHistoryDropdown"));
  fireEvent.click(screen.getByTestId("ChatHistoryMenuItem"));
  expect(container.queryByText("handleChatContactClose")).toHaveBeenCalled;
});

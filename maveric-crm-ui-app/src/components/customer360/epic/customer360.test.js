import Customer360 from "..";
import renderWithRedux from "../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import CustomerView from "../CustomerView";

afterEach(cleanup);

test("Render Customer360 component", () => {
  const container = renderWithRedux(<Customer360 />, { customerSelection: {} });
  expect(container).toMatchSnapshot();
  // fireEvent.click(screen.getByTestId("drawer-button"));
  // fireEvent.click(screen.getByTestId("goto-button"));
});
test("Render Customer360 component with store", () => {
  const container = renderWithRedux(<Customer360 />, {
    customerSelection: { customerId: "12345" },
  });
});

test("Render CustomerView component", () => {
  const container = renderWithRedux(<CustomerView />, {});
  expect(container).toMatchSnapshot();
});

test("Render Customer360 component", () => {
  const values = jest.fn();
  const container = renderWithRedux(<Customer360 setCusData={null} />, {});
  expect(container).toMatchSnapshot();
});

test("Render Customer360 component", () => {
  const offSetItem = jest.fn();
  const container = renderWithRedux(
    <Customer360 setSearchOffset={offSetItem} />,
    {}
  );
  expect(container).toMatchSnapshot();
});

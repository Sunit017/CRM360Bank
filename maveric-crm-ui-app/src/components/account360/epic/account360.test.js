import Account360 from "..";
import renderWithRedux from "../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import AccountView from "../AccountView";
import cardDetails from "../cardDetails"
import CardDetails from "../cardDetails";

afterEach(cleanup);

test("Render Account360 component", () => {
  const container = renderWithRedux(<Account360 />,{});
  expect(container).toMatchSnapshot();
  // fireEvent.click(screen.getByTestId("drawer-button"));
  // fireEvent.click(screen.getByTestId("goto-button"));
});

test("Render Account360 component", () => {
    const selectedMenu = jest.fn();
    const container = renderWithRedux(<AccountView selectedMenu={selectedMenu}/> , {});
    expect(container).toMatchSnapshot();
});

test("Render CardDetails component", () => {
  const container = renderWithRedux(<CardDetails />,{});
  expect(container).toMatchSnapshot();
  // fireEvent.click(screen.getByTestId("drawer-button"));
  // fireEvent.click(screen.getByTestId("goto-button"));
});

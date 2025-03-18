import Dashboard from "..";
import renderWithRedux from "../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";

afterEach(cleanup);

test("Render dashboard page", async () => {
  const container = renderWithRedux(<Dashboard />, {});
  expect(container).toMatchSnapshot();
});

test("Dashboard page icon click ", () => {
  const container = renderWithRedux(<Dashboard />, {});
  fireEvent.click(screen.getByTestId("customer360Search-button"));
});

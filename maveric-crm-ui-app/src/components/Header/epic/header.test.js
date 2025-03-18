import HeaderPanel from "..";
import renderWithRedux, { renderWithProviders } from "../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { addLogInfo } from "../../../store/actions";
import { setupStore } from "../../../store";

afterEach(cleanup);
test("Render header container", () => {
  const container = renderWithRedux(<HeaderPanel />, {});
  expect(container).toMatchSnapshot();
});
test("Header logout menu & menuItem click action", () => {
  const store = setupStore();
  store.dispatch(addLogInfo({ userId: "sample@sc.com" }));
  const container = renderWithProviders(<HeaderPanel />, { store });
  expect(container).toMatchSnapshot();
  fireEvent.click(screen.getByTestId("logout-button"));
  fireEvent.click(screen.getByTestId("logout-menu-item"));
  // fireEvent.click(screen.getByTestId("logout-menu"));
});

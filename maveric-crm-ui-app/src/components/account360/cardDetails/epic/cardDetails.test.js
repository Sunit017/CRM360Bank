import { renderWithProviders } from "../../../../testUtil";
import { cleanup } from "@testing-library/react";
import CardDetails from "../index";

afterEach(cleanup);

test("Render card details container", () => {
  const container = renderWithProviders(<CardDetails />, {
    preloadedState: {
      accountSelection: { cardNumber: "test_cardNumber_1" },
    },
  });
  expect(container).toMatchSnapshot();
});

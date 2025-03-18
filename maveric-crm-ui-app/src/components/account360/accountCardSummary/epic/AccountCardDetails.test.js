import { renderWithProviders } from "../../../../testUtil";
import { cleanup } from "@testing-library/react";
import AccountCardDetails from "../AccountCardDetails";

afterEach(cleanup);

test("Render account card details container", () => {
  const container = renderWithProviders(<AccountCardDetails />, {
    preloadedState: {
      account360ClientDetails: { id: "test_client_id_1" },
    },
  });
  expect(container).toMatchSnapshot();
});

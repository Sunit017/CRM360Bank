import { renderWithProviders } from "../../../../testUtil";
import { cleanup } from "@testing-library/react";
import AccountDetails from "../index";

afterEach(cleanup);

test("Render account details container", () => {
  const container = renderWithProviders(<AccountDetails />, {
    preloadedState: {
      account360Search: { accountID: "test_accountID_1" },
    },
  });
  expect(container).toMatchSnapshot();
});

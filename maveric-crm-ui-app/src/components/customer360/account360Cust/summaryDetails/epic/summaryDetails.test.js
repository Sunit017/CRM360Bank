import { renderWithProviders } from "../../../../../testUtil";
import { cleanup } from "@testing-library/react";
import SummaryDetails from "../index";

afterEach(cleanup);

test("Render summary details container", () => {
  const container = renderWithProviders(<SummaryDetails />, {
    preloadedState: {
      customerSelection: { customerId: "test_customer_id_1" },
    },
  });
  expect(container).toMatchSnapshot();
});

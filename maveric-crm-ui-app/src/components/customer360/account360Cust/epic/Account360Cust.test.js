import { renderWithProviders } from "../../../../testUtil";
import { cleanup } from "@testing-library/react";
import Account360Cust from "../index";

afterEach(cleanup);

test("Render account 360 container", () => {
  const container = renderWithProviders(<Account360Cust />, {
    preloadedState: {
      accountSelection: { pageId: "test_page_id_1" },
    },
  });
  expect(container).toMatchSnapshot();
});

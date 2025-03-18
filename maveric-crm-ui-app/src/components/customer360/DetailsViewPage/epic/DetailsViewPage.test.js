import DetailsViewPage from "..";
import renderWithRedux from "../../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
afterEach(cleanup);

test("Render DetailsViewPage ", () => {
  const container = renderWithRedux(
    <DetailsViewPage currentMenu={"personalDetails"} />,
    {}
  );
  expect(container).toMatchSnapshot();
});
test("Render DetailsViewPage with store ", () => {
  const container = renderWithRedux(
    <DetailsViewPage currentMenu={"customerDetails"} />,
    {
      customerSelection: { customerId: 1234, IDM_ARN_NO: 342455 },
    }
  );
});

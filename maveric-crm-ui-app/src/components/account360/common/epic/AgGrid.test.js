import AgGrid from "../AgGrid";
import renderWithRedux from "../../../../testUtil";
import { cleanup } from "@testing-library/react";
afterEach(cleanup);

test("Render AgGrid container", () => {
  const container = renderWithRedux(<AgGrid data={[]} />, {});
  expect(container).toMatchSnapshot();
});

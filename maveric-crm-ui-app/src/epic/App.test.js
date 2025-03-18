import App from "../App";
import renderWithRedux from "../testUtil";
import { cleanup, fireEvent } from "@testing-library/react";
import "../router";
import "../Theme";

afterEach(cleanup);

test("Render App container", () => {
  const container = renderWithRedux(<App />, {});
  expect(container).toMatchSnapshot();
});

import renderWithRedux from "../../../../testUtil";
import {
  cleanup,
  fireEvent,
  getByTestId,
  screen,
} from "@testing-library/react";
import CreateCase from "../CreateCase";

afterEach(cleanup);

test("Render create case form container", () => {
  const container = renderWithRedux(<CreateCase />, {});
  expect(container).toMatchSnapshot();
});

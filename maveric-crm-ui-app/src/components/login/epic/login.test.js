import Login from "../index";
import renderWithRedux, {renderWithProviders} from "../../../testUtil";
import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import { addLogInfo } from "../../../store/actions";
import { setupStore } from "../../../store";
afterEach(cleanup);

test("Render login page", () => {
  const container = renderWithRedux(<Login />, {});
  expect(container).toMatchSnapshot();
});

test("Login page click event to successs" , () =>{
  const { container } = renderWithRedux(<Login />, {})
  const email = container.querySelector('input[name="email"]')
  fireEvent.change(email, {
    target: {
      value: 'sample@ss.com'
    }
  })
  const password = container.querySelector('input[name="password"]')
  fireEvent.change(password, {
    target: {
      value: 'sample'
    }
  })
  const submit = container.querySelector('button[type="submit"]')
  fireEvent.click(submit)
});
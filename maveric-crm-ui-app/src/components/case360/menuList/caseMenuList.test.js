import renderWithRedux from "../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import MenuNavigation from "../menuList/index";

afterEach(cleanup);

test("Render Menu List container", () => {
  const container = renderWithRedux(<MenuNavigation />, {});
  expect(container).toMatchSnapshot();
});

test("Click Case 360 Menu Navigation view", () => {
    renderWithRedux(<MenuNavigation />, {});
    fireEvent.click(screen.getByTestId("btn-showcase"));
  });

test("Click Case 360 Menu Item view", () => {
    renderWithRedux(<MenuNavigation />, {});
    fireEvent.click(screen.getByTestId("btn-showcase"));
    fireEvent.click(screen.getByTestId("case360-menu"));
    // fireEvent.click(screen.getByTestId("case360-menu1"));
  });

  

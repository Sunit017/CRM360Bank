import Drawer from "../Drawer";
import renderWithRedux from "../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
afterEach(cleanup);

test("Render Drawer container", () => {
  const container = renderWithRedux(<Drawer />, {});
  expect(container).toMatchSnapshot();
});

test("Drawer slide click action", () => {
  const isDrawerOpen = jest.fn();
  const comp = <div> Drawer component</div>;
  const container = renderWithRedux(
    <Drawer isDrawerOpen={isDrawerOpen} drawerOpen={true} Component={comp} />,
    {}
  );
  fireEvent.click(screen.getByTestId("drawer-slide"));
});

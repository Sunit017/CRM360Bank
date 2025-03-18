import CaseManagement from "..";
import ManagementContainer from "../../common/managementContainer";
import renderWithRedux from "../../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";

afterEach(cleanup);

test("Render Case Management component", () => {
  const container = renderWithRedux(<CaseManagement />, { customerSelection: {} });
  expect(container).toMatchSnapshot();
  // fireEvent.click(screen.getByTestId("drawer-button"));
//   fireEvent.click(screen.getByTestId("goto-button"));
});

test("Render ManagementContainer component", () => {
    const container = renderWithRedux(<ManagementContainer />, {});
    expect(container).toMatchSnapshot();
  });

test("management page Export click event" , () =>{
    const { container } = renderWithRedux(<ManagementContainer />, {})
    const submit = container.querySelector('button[title="Export"]');
    fireEvent.click(submit);
  });

test("management page Edit click event" , () =>{
    const { container } = renderWithRedux(<ManagementContainer />, {})
    const editSubmit = container.querySelector('button[title="Edit"]');
    // fireEvent.click(editSubmit);
  });  
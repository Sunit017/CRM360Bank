import renderWithRedux from "../../../../testUtil";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CaseAssignment from "..";
import userEvent from "@testing-library/user-event";
import CaseAssignmentView from "../caseAssignmentView";
import CaseToolbarContainer from "../../common/caseToolbarContainer";

afterEach(cleanup);

test("Render Case Assignment component", () => {
  const container = renderWithRedux(<CaseAssignment />, {});
  expect(container).toMatchSnapshot();
});

test("Render Case Assignment Button component", async () => {
  const { container } = renderWithRedux(<CaseAssignment />, {});

  //My Cases Button
  const myCasesButton =await screen.findByText("My Cases");
  userEvent.click(myCasesButton);

  //Team's Cases Button
  const teamsCasesButton = await screen.findByText("Team Cases");
  userEvent.click(teamsCasesButton);

  //All Cases Button
  const AllCasesButton = await screen.findByText("All Cases");
  userEvent.click(AllCasesButton);
});

test("Render Case Assignment View", () => {
  const container = renderWithRedux(<CaseAssignmentView />, {});
  expect(container).toMatchSnapshot();
});

test("Edit Button For Case Assignment view", () => {
  const { container } = renderWithRedux(<CaseAssignmentView />, {});
  const editButton = container.querySelector('button[title="Edit"]');
  fireEvent.click(editButton);
});

window.URL.createObjectURL = jest.fn();
afterEach(() => {
  window.URL.createObjectURL.mockReset();
});
test("Save Button For Case Assignment view", () => {
  const { container } = renderWithRedux(<CaseToolbarContainer />, {});
  const Save = container.querySelector('button[title="Save"]');
  expect(Save).toBeInTheDocument;
});

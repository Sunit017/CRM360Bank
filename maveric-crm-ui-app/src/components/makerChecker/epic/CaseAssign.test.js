import { renderWithProviders } from "../../../testUtil";
import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import CaseAssign from "../caseAssign";

afterEach(cleanup);

test("Render CaseAssign component", () => {
  const { container } = renderWithProviders(<CaseAssign />, {});
  expect(container).toMatchSnapshot();
});
test("Select CaseAssign status field", () => {
  const { container } = renderWithProviders(<CaseAssign />, {});
  const CaseStatus = container.querySelector('input[name="case"]');
  fireEvent.change(CaseStatus, {
    target: {
      value: "Approved",
    },
  });
});
test("Action of caseId CaseAssign", () => {
  const onSelectMenu = jest.fn();
  const { container } = renderWithProviders(
    <CaseAssign onSelectMenu={onSelectMenu} />,
    {}
  );
  //fireEvent.click(screen.getByTestId("MD123457-button"));
  //expect(onSelectMenu).toHaveBeenCalledTimes(1);
});
test("Select CaseAssign fromDate field", () => {
  const { container } = renderWithProviders(<CaseAssign />, {});
  const inputEl = container.querySelector('input[name="fromDate"]');
  fireEvent.click(inputEl, { target: { value: "12/12/2022" } });
  //   expect(inputEl).toHaveValue("12/12/2001");
});
test("Select CaseAssign toDate field", () => {
  const { container } = renderWithProviders(<CaseAssign />, {});
  const inputEl = container.querySelector('input[name="toDate"]');
  fireEvent.click(inputEl, { target: { value: "15/12/2022" } });
  //   expect(inputEl).toHaveValue("12/12/2001");
});

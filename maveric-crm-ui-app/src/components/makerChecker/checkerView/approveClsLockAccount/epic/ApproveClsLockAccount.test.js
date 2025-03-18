import ApproveClsLockAccount from "..";
import renderWithRedux, { renderWithProviders } from "../../../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

test("Render Approve/Close/Lock/Unlock screen", () => {
  const container = renderWithProviders(
    <ApproveClsLockAccount
      checkerHeight="200px"
      isChecker={false}
      checkerData={null}
    />,
    {}
  );
  expect(container).toMatchSnapshot();
});

test("Make  Approve/Close/Lock/Unlock form fields  ", () => {
  const { container } = renderWithProviders(
    <ApproveClsLockAccount
      checkerHeight="200px"
      isChecker={false}
      checkerData={null}
    />,
    {
      preloadedState: {
        customerSelection: { data: "1234" },
        account360Search: { accountID: "test_accountID_1" },
        account360ClientDetails: { id: "test_client_id_1" },
      },
    }
  );
  const operationType = container.querySelector(
    'input[name="operationType"]'
  );
  fireEvent.change(operationType, {
    target: {
      value: "Lock",
    },
  });

  const submit = container.querySelector('button[type="submit"]');
  fireEvent.click(submit);

  const reset = container.querySelector('button[type="reset"]');
  fireEvent.click(reset);
});


test("Checker Approve Button  Approve/Close/Lock/Unlock ", async () => {
  const { container } = renderWithProviders(
    <ApproveClsLockAccount
      checkerHeight="200px"
      isChecker={true}
      checkerData={{ customerId: "test_customerID_1", accountNo: "test_accountNo_1", caseId: "test_caseID_1", accountState: "ACTIVE" }}
    />,
    {}
  );
  
  const approveButton = await screen.findByText("Approve");
  userEvent.click(approveButton);
});

test("Checker Reject Button Approve/Close/Lock/Unlock", async () => {
  const { container } = renderWithRedux(
    <ApproveClsLockAccount
      checkerHeight="200px"
      isChecker={true}
      checkerData={{}}
    />,
    {}
  );

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  const onReject = jest.fn();

  const rejectButton = await screen.findByText("Reject");
  userEvent.click(rejectButton);
});

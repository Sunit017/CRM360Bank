import ApplyAccountFees from "..";
import renderWithRedux, { renderWithProviders } from "../../../../../testUtil";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

test("Render Apply Account Fees screen", () => {
  const container = renderWithProviders(
    <ApplyAccountFees
      isAccount360={false}
      checkerHeight="200px"
      isChecker={false}
      checkerData={null}
    />,
    {}
  );
  expect(container).toMatchSnapshot();
});

test("Make  Apply Account Fees form fields  ", () => {
  const { container } = renderWithProviders(
    <ApplyAccountFees
      isAccount360={false}
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

  const productName = container.querySelector('input[name="productName"]');
  fireEvent.change(productName, {
    target: {
      value: "Lock",
    },
  });

  const feeType = container.querySelector('input[name="feeType"]');
  fireEvent.change(feeType, {
    target: {
      value: "Lock",
    },
  });

  const feeAmount = container.querySelector('input[name="feeAmount"]');
  fireEvent.change(feeAmount, {
    target: {
      value: "Lock",
    },
  });

  const submit = container.querySelector('button[type="submit"]');
  fireEvent.click(submit);

  const reset = container.querySelector('button[type="reset"]');
  fireEvent.click(reset);
});

test("Checker Approve Button  Apply Account Fees ", async () => {
  const { container } = renderWithProviders(
    <ApplyAccountFees
      isAccount360={false}
      checkerHeight="200px"
      isChecker={true}
      checkerData={{
        customerId: "test_customerID_1",
        accountNo: "test_accountNo_1",
        caseId: "test_caseID_1",
        accountState: "ACTIVE",
      }}
    />,
    {}
  );

  const approveButton = await screen.findByText("Approve");
  userEvent.click(approveButton);
});

test("Checker Reject Button Apply Account Fees", async () => {
  const { container } = renderWithRedux(
    <ApplyAccountFees
      isAccount360={false}
      checkerHeight="200px"
      isChecker={true}
      checkerData={{
        customerId: "test_customerID_1",
        accountNo: "test_accountNo_1",
        caseId: "test_caseID_1",
        accountState: "ACTIVE",
      }}
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

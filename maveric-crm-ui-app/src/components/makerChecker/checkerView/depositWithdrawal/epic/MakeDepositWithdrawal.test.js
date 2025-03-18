import MakeDepositWithdrawal from "..";
import renderWithRedux, { renderWithProviders } from "../../../../../testUtil";
import {
  cleanup,
  fireEvent,
  queryByText,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

test("Render Make Deposit Withdrawal screen", () => {
  const container = renderWithProviders(
    <MakeDepositWithdrawal
      checkerHeight="200px"
      isChecker={false}
      checkerData={null}
    />,
    {}
  );
  expect(container).toMatchSnapshot();
});

test("Render Make Deposit Withdrawal component with store", () => {
  const container = renderWithRedux(
    <MakeDepositWithdrawal
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
  expect(container).toMatchSnapshot();
});

test("Make Withdrawal form fields  ", async () => {
  const { container } = renderWithProviders(
    <MakeDepositWithdrawal
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

  const transactionType = container.querySelector(
    'input[name="transactionType"]'
  );
  fireEvent.change(transactionType, {
    target: {
      value: "makeDeposite",
    },
  });

  const amount = container.querySelector('input[name="amount"]');
  fireEvent.change(amount, {
    target: {
      value: "1000",
    },
  });

  const channel = container.querySelector('input[name="channel"]');
  fireEvent.change(channel, {
    target: {
      value: "channel",
    },
  });

  const partnerChannelName = container.querySelector(
    'input[name="partnerChannelName"]'
  );
  fireEvent.change(partnerChannelName, {
    target: {
      value: "partnerChannelName",
    },
  });
  const transactionCode = container.querySelector(
    'input[name="transactionCode"]'
  );
  fireEvent.change(transactionCode, {
    target: {
      value: "transactionCode",
    },
  });
  const identifier = container.querySelector('input[name="identifier"]');
  fireEvent.change(identifier, {
    target: {
      value: "identifier",
    },
  });
  const bank = container.querySelector('input[name="bank"]');
  fireEvent.change(bank, {
    target: {
      value: "bank",
    },
  });
  const receipt = container.querySelector('input[name="receipt"]');
  fireEvent.change(receipt, {
    target: {
      value: "receipt",
    },
  });
  const check = container.querySelector('input[name="check"]');
  fireEvent.change(check, {
    target: {
      value: "check",
    },
  });
  const account = container.querySelector('input[name="account"]');
  fireEvent.change(account, {
    target: {
      value: "account",
    },
  });
  const accountName = container.querySelector('input[name="accountName"]');
  fireEvent.change(accountName, {
    target: {
      value: "accountName",
    },
  });
  const routing = container.querySelector('input[name="routing"]');
  fireEvent.change(routing, {
    target: {
      value: "routing",
    },
  });
  const payoutTransactionId = container.querySelector(
    'input[name="payoutTransactionId"]'
  );
  fireEvent.change(payoutTransactionId, {
    target: {
      value: "payoutTransactionId",
    },
  });
  const payoutTransactionStatus = container.querySelector(
    'input[name="payoutTransactionStatus"]'
  );
  fireEvent.change(payoutTransactionStatus, {
    target: {
      value: "payoutTransactionStatus",
    },
  });
  const payoutDoneOn = container.querySelector('input[name="payoutDoneOn"]');
  fireEvent.change(payoutDoneOn, {
    target: {
      value: "payoutDoneOn",
    },
  });

  const submit = container.querySelector('button[type="submit"]');
  fireEvent.click(submit);

  const reset = container.querySelector('button[type="reset"]');
  fireEvent.click(reset);
});

test("Checker Approve Button", async () => {
  const { container } = renderWithRedux(
    <MakeDepositWithdrawal
      checkerHeight="200px"
      isChecker={true}
      checkerData={{ customerId: "123", accountNo: "456" }}
    />,
    {}
  );

  const approveButton = await screen.findByText("Approve");
  userEvent.click(approveButton);
});

test("Checker Reject Button", async () => {
  const { container } = renderWithRedux(
    <MakeDepositWithdrawal
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

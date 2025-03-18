import { cleanup } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MAMBU_DOMAIN_URL } from "../../../configBase";
import {
  makeDepositTransaction,
  makeWithdrawalTransaction,
} from "../mambuDepositTransactions";

afterEach(cleanup);

describe("makeDeposit", () => {
  let mock;
  const data = [{ accountId: "test" }];

  const authToken = {
    token_type: "test_token",
    access_token: "test_value",
  };
  const mockCallback = jest.fn();

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("when API call is successful", () => {
    it("should return deposit details", async () => {
      mock
        .onPost(
          `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountId}/deposit-transactions`
        )
        .reply(200, data);

      makeDepositTransaction(mockCallback, data, authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountId}/deposit-transactions`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });

  describe("when API call fails", () => {
    it("should not return deposit details", async () => {
      const message = "Network Error";
      console.log = jest.fn();
      mock
        .onPost(
          `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountId}/deposit-transactions`
        )
        .networkError();

      makeDepositTransaction(mockCallback, "test_card", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountId}/deposit-transactions`
      );
    });
  });
});

//Withdrawal
describe("makeWithdrawal", () => {
  let mockAdapter;
  const data = [{ accountId: "test" }];

  const authToken = {
    token_type: "test_token",
    access_token: "test_value",
  };
  const mockCallback = jest.fn();

  beforeAll(() => {
    mockAdapter = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  describe("when API call is successful", () => {
    // const mock = new MockAdapter(axios);
    it("should return deposit details", async () => {
      mockAdapter
        .onPost(
          `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountId}/withdrawal-transactions`
        )
        .reply(200, data);

      makeWithdrawalTransaction(mockCallback, data, authToken);

      expect(mockAdapter.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountId}/withdrawal-transactions`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });

  describe("when API call fails", () => {
    it("should not return deposit details", async () => {
      const message = "Network Error";
      console.log = jest.fn();
      mockAdapter
        .onPost(
          `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountId}/withdrawal-transactions`
        )
        .networkError();

      makeWithdrawalTransaction(mockCallback, "test_card", authToken);

      expect(mockAdapter.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountId}/withdrawal-transactions`
      );
    });
  });
});

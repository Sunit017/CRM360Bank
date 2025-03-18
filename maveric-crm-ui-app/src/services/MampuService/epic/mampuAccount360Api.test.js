import { cleanup } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MAMBU_DOMAIN_URL } from "../../../configBase";
import {
  getAccountDetails,
  getAccountTransaction,
} from "../mampuAccount360Api";

afterEach(cleanup);

describe("getAccountDetails", () => {
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
    it("should return account details", async () => {
      mock.onPost(`${MAMBU_DOMAIN_URL}/api/deposits:search`).reply(200, data);

      getAccountDetails(mockCallback, "test_account", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits:search`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });

  describe("when API call fails", () => {
    it("should not return account details", async () => {
      const message = "Network Error";
      console.log = jest.fn();
      mock.onPost(`${MAMBU_DOMAIN_URL}/api/deposits:search`).networkError();

      getAccountDetails(mockCallback, "test_account", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits:search`
      );
    });
  });
});

describe("getAccountTransaction", () => {
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
    it("should return transaction details", async () => {
      mock
        .onPost(
          `${MAMBU_DOMAIN_URL}/api/deposits/transactions:search?detailsLevel=FULL`
        )
        .reply(200, data);

      getAccountTransaction(mockCallback, "test_account", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits/transactions:search?detailsLevel=FULL`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });

  describe("when API call fails", () => {
    it("should not return transaction details", async () => {
      const message = "Network Error";
      console.log = jest.fn();
      mock
        .onPost(
          `${MAMBU_DOMAIN_URL}/api/deposits/transactions:search?detailsLevel=FULL`
        )
        .networkError();

      getAccountTransaction(mockCallback, "test_account", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits/transactions:search?detailsLevel=FULL`
      );
    });
  });
});

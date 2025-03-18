import { cleanup } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MAMBU_DOMAIN_URL } from "../../../configBase";
import {
  getCardSummary,
  getAccountSummarySearch,
} from "../mampuCustomer360Api";

afterEach(cleanup);

describe("getCardSummary", () => {
  let mock;
  const data = [{ customerId: "test" }];

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
    it("should return card summary details", async () => {
      mock
        .onPost(
          `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/SearchCard/V2?detailsLevel=FULL`
        )
        .reply(200, data);

      getCardSummary(mockCallback, "test_card", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/SearchCard/V2?detailsLevel=FULL`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });

  describe("when API call fails", () => {
    it("should not return card summary details", async () => {
      const message = "Network Error";
      console.log = jest.fn();
      mock
        .onPost(
          `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/SearchCard/V2?detailsLevel=FULL`
        )
        .networkError();

      getCardSummary(mockCallback, "test_card", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/SearchCard/V2?detailsLevel=FULL`
      );
    });
  });
});

describe("getAccountSummarySearch", () => {
  let mock;
  const data = [{ customerId: "test" }];

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
    it("should return account summary details", async () => {
      mock
        .onPost(`${MAMBU_DOMAIN_URL}/api/deposits:search?detailsLevel=FULL`)
        .reply(200, data);

      getAccountSummarySearch(mockCallback, "test_customer", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits:search?detailsLevel=FULL`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });

  describe("when API call fails", () => {
    it("should not return account summary details", async () => {
      const message = "Network Error";
      console.log = jest.fn();
      mock
        .onPost(`${MAMBU_DOMAIN_URL}/api/deposits:search?detailsLevel=FULL`)
        .networkError();

      getAccountSummarySearch(mockCallback, "test_customer", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/deposits:search?detailsLevel=FULL`
      );
    });
  });
});

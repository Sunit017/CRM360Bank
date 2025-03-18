import { cleanup } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MAMBU_DOMAIN_URL } from "../../../configBase";
import { getCardDetails, getClientId } from "../mampuCardDetails";

afterEach(cleanup);

describe("getCardDetails", () => {
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
    it("should return card details", async () => {
      mock
        .onPost(
          `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/GetCardDetails/V2?detailsLevel=FULL`
        )
        .reply(200, data);

      getCardDetails(mockCallback, "test_card", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/GetCardDetails/V2?detailsLevel=FULL`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });

  describe("when API call fails", () => {
    it("should not return card details", async () => {
      const message = "Network Error";
      console.log = jest.fn();
      mock
        .onPost(
          `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/GetCardDetails/V2?detailsLevel=FULL`
        )
        .networkError();

      getCardDetails(mockCallback, "test_card", authToken);

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/GetCardDetails/V2?detailsLevel=FULL`
      );
    });
  });
});

describe("getClientId", () => {
  let mock;
  const data = [{ clientId: "test" }];

  const authToken = {
    token_type: "test_token",
    access_token: "test_value",
  };
  const mockCallback = jest.fn();

  const accountHolderKey = "test_key";

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("when API call is successful", () => {
    it("should return client details", async () => {
      mock
        .onGet(`${MAMBU_DOMAIN_URL}/api/clients/${accountHolderKey}`)
        .reply(200, data);

      getClientId(mockCallback, accountHolderKey, authToken);

      expect(mock.history.get[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/clients/test_key`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });

  describe("when API call fails", () => {
    it("should not return client details", async () => {
      const message = "Network Error";
      console.log = jest.fn();
      mock
        .onGet(`${MAMBU_DOMAIN_URL}/api/clients/${accountHolderKey}`)
        .networkError();

      getClientId(mockCallback, accountHolderKey, authToken);

      expect(mock.history.get[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/clients/test_key`
      );
    });
  });
});

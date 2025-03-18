import { cleanup } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getCustomersSearchApi,
  getCustomerPageApi,
} from "../Customer360Service";
import { BASE_URL } from "../../configBase";

afterEach(cleanup);

describe("getCustomerSearchApi", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("when API call is successful", () => {
    it("should return customer details", async () => {
      const reqPayload = { customerId: 1 };

      const mockCallback = jest.fn();

      const data = [
        {
          customerId: 1,
          firstName: "Test FN",
          lastName: "Test LN",
          middleName: "Test MN",
          mobilePhone: null,
          emailAddress: null,
          idmArnNo: null,
        },
      ];

      mock.onPost(`${BASE_URL}/customer/search`).reply(200, data);

      getCustomersSearchApi(mockCallback, reqPayload);

      expect(mock.history.post[0].url).toEqual(`${BASE_URL}/customer/search`);

      expect(mockCallback.call.length).toBe(1);
    });

    describe("when API call fails", () => {
      it("should return empty customer list", async () => {
        const message = "Network Error";
        const reqPayload = { customerId: 1 };
        const mockCallback = jest.fn();
        console.log = jest.fn();
        mock.onPost(`${BASE_URL}/customer/search`).networkError();

        getCustomersSearchApi(mockCallback, reqPayload);

        expect(mock.history.post[0].url).toEqual(`${BASE_URL}/customer/search`);
      });
    });
  });
});

describe("getCustomerPageApi", () => {
  let mock;
  let pageId;
  let custId;
  const mockCallback = jest.fn();

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("when API call is successful", () => {
    it("should return customer tab details", async () => {
      const data = [
        {
          customerId: "test_Id_1",
        },
      ];

      mock.onGet(`${BASE_URL}/customer/${pageId}/${custId}`).reply(200, data);

      getCustomerPageApi(mockCallback, "test_page", "test_id_1");

      expect(mock.history.get[0].url).toEqual(
        `${BASE_URL}/customer/test_page/test_id_1`
      );

      expect(mockCallback.call.length).toBe(1);
    });

    describe("when API call fails", () => {
      it("should return empty customer list", async () => {
        const message = "Network Error";
        mock.onGet(`${BASE_URL}/customer/${pageId}/${custId}`).networkError();

        getCustomerPageApi(mockCallback, "test_page", "test_id_1");

        expect(mock.history.get[0].url).toEqual(
          `${BASE_URL}/customer/test_page/test_id_1`
        );
      });
    });
  });
});

import { cleanup } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MAMBU_DOMAIN_URL } from "../../../configBase";
import {getAuthDetails} from "../getAuthInformation";

afterEach(cleanup);

describe("get Auth Details", () => {
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
          `${MAMBU_DOMAIN_URL}/remote-token/token`
        )
        .reply(200, data);

        getAuthDetails();

      expect(mock.history.post[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/remote-token/token`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });
});
import { cleanup } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MAMBU_DOMAIN_URL } from "../../../configBase";
import { getBranchName } from "../mambuBranchMapping";

afterEach(cleanup);

describe("getBranchName", () => {
  let mock;
  const data = [{ name: "test_branch" }];
  const branch = "test_branch_encodedkey";

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
    it("should return branch name", async () => {
      mock.onGet(`${MAMBU_DOMAIN_URL}/api/branches/${branch}`).reply(200, data);

      getBranchName(mockCallback, branch, authToken);

      expect(mock.history.get[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/branches/test_branch_encodedkey`
      );

      expect(mockCallback.call.length).toBe(1);
    });
  });

  describe("when API call fails", () => {
    it("should not return branch details", async () => {
      const message = "Network Error";
      console.log = jest.fn();
      mock.onGet(`${MAMBU_DOMAIN_URL}/api/branches/${branch}`).networkError();

      getBranchName(mockCallback, branch, authToken);

      expect(mock.history.get[0].url).toEqual(
        `${MAMBU_DOMAIN_URL}/api/branches/test_branch_encodedkey`
      );
    });
  });
});

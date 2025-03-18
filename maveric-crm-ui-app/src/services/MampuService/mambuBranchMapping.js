import axios from "axios";
import { MAMBU_DOMAIN_URL } from "../../configBase";
import { getAuthDetails } from "./getAuthInformation";

export const getBranchNameApi = (callback, branch) => {
  getAuthDetails().then((res) => {
    getBranchName(callback, branch, res);
  });
};

export const getBranchName = (callback, branch, authToken) => {
  const { token_type, access_token } = authToken;
  const url = `${MAMBU_DOMAIN_URL}/api/branches/${branch}`;
  const config = {
    headers: {
      "content-type": "application/json",
      Accept: "application/vnd.mambu.v2+json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token_type} ${access_token}`,
    },
  };
  axios
    .get(url, config)
    .then((response) => callback(response.data.name))
    .catch((error) => console.log(error));
};

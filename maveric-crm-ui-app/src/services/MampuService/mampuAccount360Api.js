import axios from "axios";
import { MAMBU_DOMAIN_URL } from "../../configBase";
import { getAuthDetails } from "./getAuthInformation";

export const getAccountDetailsApi = (callback, accountNumber) => {
  getAuthDetails().then((res) => {
    getAccountDetails(callback, accountNumber, res);
  });
};

export const getAccountDetails = (callback, accountNumber, authToken) => {
  const { token_type, access_token } = authToken;
  const url = `${MAMBU_DOMAIN_URL}/api/deposits:search`;
  const requestParam = {
    filterCriteria: [
      {
        field: "id",
        operator: "EQUALS",
        value: accountNumber,
      },
    ],
  };
  const config = {
    headers: {
      "content-type": "application/json",
      Accept: "application/vnd.mambu.v2+json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token_type} ${access_token}`,
    },
  };
  axios
    .post(url, requestParam, config)
    .then((response) => callback(response.data))
    .catch((error) => console.log(error));
};

export const getTransactionApi = (callback, accountNumber) => {
  getAuthDetails().then((res) => {
    getAccountTransaction(callback, accountNumber, res);
  });
};

export const getAccountTransaction = (callback, accountNumber, authToken) => {
  const { token_type, access_token } = authToken;
  const url = `${MAMBU_DOMAIN_URL}/api/deposits/transactions:search?detailsLevel=FULL`;
  const requestParam = {
    filterCriteria: [
      {
        field: "id",
        operator: "EQUALS",
        value: accountNumber,
      },
    ],
  };
  const config = {
    headers: {
      "content-type": "application/json",
      Accept: "application/vnd.mambu.v2+json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token_type} ${access_token}`,
    },
  };
  axios
    .post(url, requestParam, config)
    .then((response) => callback(response.data))
    .catch((error) => console.log(error));
};

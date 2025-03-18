import axios from "axios";
import { MAMBU_DOMAIN_URL } from "../../configBase";
import { getAuthDetails } from "./getAuthInformation";
export const getCardDetailsApi = (callback, cardNumber) => {
  getAuthDetails().then((res) => {
    getCardDetails(callback, cardNumber, res);
  });
};
export const getCardDetails = (callback, cardNumber, authToken) => {
  const { token_type, access_token } = authToken;
  const url = `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/GetCardDetails/V2?detailsLevel=FULL`;
  const requestParam = {
    cardNumber,
    requestInfo: {
      requestUID: "6948DF80-14BD-4E04-8842-7668D9C001F5",
      requestDate: "2020-02-05T00:00:00",
      userID: "user0001",
    },
  };
  const config = {
    headers: {
      "content-type": "application/json",
      //   Accept: "application/vnd.mambu.v2+json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token_type} ${access_token}`,
    },
  };
  axios
    .post(url, requestParam, config)
    .then((response) => callback(response?.data))
    .catch((error) => console.log(error));
};

export const getCliendIdApi = (callback, accountKey) => {
  getAuthDetails().then((res) => {
    getClientId(callback, accountKey, res);
  });
};
export const getClientId = (callback, accountHolderKey, authToken) => {
  const { token_type, access_token } = authToken;
  const url = `${MAMBU_DOMAIN_URL}/api/clients/${accountHolderKey}`;
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
    .then((response) => callback(response?.data))
    .catch((error) => console.log(error));
};

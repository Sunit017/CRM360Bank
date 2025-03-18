import axios from "axios";
import { MAMBU_DOMAIN_URL } from "../../configBase";
import { getAuthDetails } from "./getAuthInformation";

export const getCardSummaryApi = (callback, customerId) => {
  getAuthDetails().then((res) => {
    getCardSummary(callback, customerId, res);
  });
};
export const getCardSummary = (callback, customerId, authToken) => {
  const { token_type, access_token } = authToken;
  const url = `${MAMBU_DOMAIN_URL}/PowerCardConnectApi/rest/SearchCard/V2?detailsLevel=FULL`;
  const requestParam = {
    clientCode: customerId,
    requestInfo: {
      requestUID: "6948DF80-14BD-4E04-8842-7668D9C001F5",
      requestDate: "2020-02-05T00:00:00",
      userID: customerId,
    },
    keyValues: [
      {
        data: "N",
        key: "TOKEN",
      },
      {
        data: "10",
        key: "pageSize",
      },
      {
        data: "1",
        key: "pageIndex",
      },
    ],
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
    .then((response) => callback(response?.data?.card))
    .catch((error) => console.log(error));
};
export const getAccounSummaryApi = (callback, customerId) => {
  getAuthDetails().then((res) => {
    getAccountSummarySearch(callback, customerId, res);
  });
};
export const getAccountSummarySearch = (callback, customerId, authToken) => {
  const { token_type, access_token } = authToken;
  const url = `${MAMBU_DOMAIN_URL}/api/deposits:search?detailsLevel=FULL`;
  const requestParam = {
    filterCriteria: [
      {
        field: "clientId",
        operator: "EQUALS",
        value: customerId,
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

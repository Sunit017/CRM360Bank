import axios from "axios";
import { MAMBU_DOMAIN_URL } from "../../configBase";
import { getAuthDetails } from "./getAuthInformation";

export const withdrawalTransactionApi = (callback, data) => {
  getAuthDetails().then((res) => {
    makeWithdrawalTransaction(callback, data, res);
  });
};

export const makeWithdrawalTransaction = (callback, data, authToken) => {
  const { token_type, access_token } = authToken;
  const url = `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountNo}/withdrawal-transactions`;
  const requestParam = {
    // _EXAMPLE_CUSTOM_FIELDS: {
    //   ACCOUNT_NAME_TRANSACTION_CHANNEL: "123987",
    //   ACCOUNT_NUMBER_TRANSACTION_CHANN: "456321",
    //   BANK_NUMBER_TRANSACTION_CHANNEL_: "789654",
    // },
    amount: data.amount,
    bookingDate: data.bookingDate,
    externalId: data.caseId,
    notes: data.notes,
    // paymentOrderId: "PAY-1234-abc",
    transactionDetails: {
      transactionChannelId: data.channelId,
      // transactionChannelKey: "8a8e86737dc73f20017dc7709dde0294",
    },
    valueDate: data.valueDate,
  };
  const config = {
    headers: {
      "content-type": "application/json",
      Accept: "application/vnd.mambu.v2+json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token_type} ${access_token}`,
      //   Idempotency-Key:'string'
    },
  };
  axios
    .post(url, requestParam, config)
    .then((response) => {
      callback(response);
      // console.log("response - withdraw", response);
    })
    .catch((error) => console.error(error));
};

//DEPOSIT
export const depositTransactionApi = (callback, data) => {
  getAuthDetails().then((res) => {
    makeDepositTransaction(callback, data, res);
  });
};

export const makeDepositTransaction = (callback, data, authToken) => {
  const { token_type, access_token } = authToken;
  const url = `${MAMBU_DOMAIN_URL}/api/deposits/${data.accountNo}/deposit-transactions`;
  const requestParam = {
    // _Transaction_Details_Transaction: {
    //   ACCOUNT_NAME_TRANSACTION_CHANNEL: "123987",
    //   ACCOUNT_NUMBER_TRANSACTION_CHANN: "456321",
    //   BANK_NUMBER_TRANSACTION_CHANNEL_: "789654",
    // },
    // accountId: "DEF-456",
    // accountId: data.caseId,
    amount: data.amount,
    bookingDate: data.bookingDate,
    externalId: data.caseId,
    notes: data.notes,
    // paymentOrderId: "PAY-1234-abc",
    transactionDetails: {
      transactionChannelId: data.channelId,
      // transactionChannelKey: "8a8e86737dc73f20017dc7709dde0294",
    },
    valueDate: data.valueDate,
  };
  const config = {
    headers: {
      "content-type": "application/json",
      Accept: "application/vnd.mambu.v2+json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `${token_type} ${access_token}`,
      //Idempotency-Key:'string'
    },
  };
  axios
    .post(url, requestParam, config)
    .then((response) => callback(response))
    .catch((error) => console.error(error));
};

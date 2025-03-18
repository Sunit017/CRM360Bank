import axios from "axios";
import { TRANSACTION_BASE_URL } from "../configBase";
import { getAccountDetailsApi } from "./MampuService/mampuAccount360Api";
import {
  withdrawalTransactionApi,
  depositTransactionApi,
} from "./MampuService/mambuDepositTransactions";

export const transactionCheckApi = (callback, request) => {
  const url = `${TRANSACTION_BASE_URL}/v1/validate-transactions`;
  let config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  const { accountId, customerId, transactionCodes } = request;
  const requestParam = [
    {
      accountId,
      customerId,
      transactionCodes,
    },
  ];
  axios
    .post(url, requestParam, config)
    .then((response) => callback(response))
    .catch((error) => callback(error.response));
};

export const onHandleBalanceCheckApi = (callback, accountNumber) => {
  getAccountDetailsApi(callback, accountNumber);
};

export const onMakeWithdrawalTransaction = (callback, data) => {
  withdrawalTransactionApi(callback, data);
};

export const onMakeDepositTransaction = (callback, data) => {
  depositTransactionApi(callback, data);
};

import {
  ADD_LOGINFO,
  REMOVE_LOGINFO,
  ADD_USER_SELECTION,
  REMOVE_USER_SELECTION,
  ADD_ACCOUNT_360_PAGE,
  REMOVE_ACCOUNT_360_PAGE,
  ADD_ACCOUNT_360_NUMBER,
  REMOVE_ACCOUNT_360_NUMBER,
  ADD_ACCOUNT_360_CLIENT_DETAILS,
  REMOVE_ACCOUNT_360_CLIENT_DETAILS,
  ADD_OPS_360_PAGE_DETAILS,
  REMOVE_OPS_360_PAGE_DETAILS,
  ADD_ACCOUNT_360_PAGE_DETAILS,
  REMOVE_ACCOUNT_360_PAGE_DETAILS,
  ADD_CUSTOMER_360_PAGE_DETAILS,
  REMOVE_CUSTOMER_360_PAGE_DETAILS,
} from "../constants";

export const addLogInfo = (payload) => ({
  type: ADD_LOGINFO,
  payload,
});

export const removeLogInfo = (payload) => ({
  type: REMOVE_LOGINFO,
  payload,
});

export const addUserSelect = (payload) => ({
  type: ADD_USER_SELECTION,
  payload,
});

export const removeUserSelect = (payload) => ({
  type: REMOVE_USER_SELECTION,
  payload,
});

export const addAccout360Page = (payload) => ({
  type: ADD_ACCOUNT_360_PAGE,
  payload,
});
export const removeAccout360Page = (payload) => ({
  type: REMOVE_ACCOUNT_360_PAGE,
  payload,
});
export const addAccount360Search = (payload) => ({
  type: ADD_ACCOUNT_360_NUMBER,
  payload,
});
export const removeAccount360Search = (payload) => ({
  type: REMOVE_ACCOUNT_360_NUMBER,
  payload,
});
export const addAccount360ClientInfo = (payload) => ({
  type: ADD_ACCOUNT_360_CLIENT_DETAILS,
  payload,
});
export const removeAccount360ClientInfo = (payload) => ({
  type: REMOVE_ACCOUNT_360_CLIENT_DETAILS,
  payload,
});
export const addOps360PageDetails = (payload) => ({
  type: ADD_OPS_360_PAGE_DETAILS,
  payload,
});
export const removeOps360PageDetails = (payload) => ({
  type: REMOVE_OPS_360_PAGE_DETAILS,
  payload,
});
export const addAccount360PageDetails = (payload) => ({
  type: ADD_ACCOUNT_360_PAGE_DETAILS,
  payload,
});
export const removeAccount360PageDetails = (payload) => ({
  type: REMOVE_ACCOUNT_360_PAGE_DETAILS,
  payload,
});
export const addCustomer360PageDetails = (payload) => ({
  type: ADD_CUSTOMER_360_PAGE_DETAILS,
  payload,
});
export const removeCustomer360PageDetails = (payload) => ({
  type: REMOVE_CUSTOMER_360_PAGE_DETAILS,
  payload,
});

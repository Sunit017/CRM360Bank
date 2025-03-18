import {
  ADD_LOGINFO,
  REMOVE_LOGINFO,
  ADD_USER_SELECTION,
  REMOVE_USER_SELECTION,
  ADD_ACCOUNT_360_PAGE,
  REMOVE_ACCOUNT_360_PAGE,
  ADD_ACCOUNT_360_NUMBER,
  REMOVE_ACCOUNT_360_NUMBER,
  REMOVE_ACCOUNT_360_CLIENT_DETAILS,
  ADD_ACCOUNT_360_CLIENT_DETAILS,
  ADD_OPS_360_PAGE_DETAILS,
  REMOVE_OPS_360_PAGE_DETAILS,
  ADD_ACCOUNT_360_PAGE_DETAILS,
  REMOVE_ACCOUNT_360_PAGE_DETAILS,
  ADD_CUSTOMER_360_PAGE_DETAILS,
  REMOVE_CUSTOMER_360_PAGE_DETAILS,
} from "../constants";

const initialState = {
  userLoggedInfo: {},
  customerSelection: null,
  accountSelection: null,
  account360Search: "",
  account360ClientDetails: null,
  ops360PageDetails: {},
  account360PageDetails: {},
};

const crmAppReducer = (state = initialState, action) => {
  console.info(action);
  switch (action.type) {
    case ADD_LOGINFO:
      return { ...state, userLoggedInfo: action.payload };
    case REMOVE_LOGINFO:
      return { ...state, userLoggedInfo: {} };
    case ADD_USER_SELECTION:
      return { ...state, customerSelection: action.payload };
    case REMOVE_USER_SELECTION:
      return { ...state, customerSelection: null };
    case ADD_ACCOUNT_360_PAGE:
      return { ...state, accountSelection: action.payload };
    case ADD_ACCOUNT_360_NUMBER:
      return { ...state, account360Search: action.payload };
    case REMOVE_ACCOUNT_360_NUMBER:
      return { ...state, account360Search: "" };
    case REMOVE_ACCOUNT_360_PAGE:
      return { ...state, accountSelection: null };
    case ADD_ACCOUNT_360_CLIENT_DETAILS:
      return { ...state, account360ClientDetails: action.payload };
    case REMOVE_ACCOUNT_360_CLIENT_DETAILS:
      return { ...state, account360ClientDetails: null };
    case ADD_OPS_360_PAGE_DETAILS:
      return { ...state, ops360PageDetails: action.payload };
    case REMOVE_OPS_360_PAGE_DETAILS:
      return { ...state, ops360PageDetails: {} };
    case ADD_ACCOUNT_360_PAGE_DETAILS:
      return { ...state, account360PageDetails: action.payload };
    case REMOVE_ACCOUNT_360_PAGE_DETAILS:
      return { ...state, account360PageDetails: {} };
    case ADD_CUSTOMER_360_PAGE_DETAILS:
      return { ...state, customer360PageDetails: action.payload };
    case REMOVE_CUSTOMER_360_PAGE_DETAILS:
      return { ...state, customer360PageDetails: {} };
      
    default:
      return state;
  }
};

export default crmAppReducer;

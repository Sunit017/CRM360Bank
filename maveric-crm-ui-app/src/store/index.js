import { configureStore } from "@reduxjs/toolkit";

import crmAppReducer from "./reducers";

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: crmAppReducer,
    preloadedState,
  });
};

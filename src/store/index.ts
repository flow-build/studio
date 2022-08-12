import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import diagramReducer from "store/slices/diagram";
import filterReducer from "store/slices/filter";
import comparePageReducer from "store/slices/compare-page";
import workflowPageReducer from "store/slices/workflow-page";
import settingsReducer from "store/slices/settings";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    workflowPage: workflowPageReducer,
    comparePage: comparePageReducer,
    diagramPage: diagramReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

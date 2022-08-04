import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import diagramReducer from "store/slices/diagram";
import filterReducer from "store/slices/filter";
import comparePageReducer from "store/slices/compare-page";
import workflowPageReducer from "store/slices/workflow-page";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    workflowPage: workflowPageReducer,
    comparePage: comparePageReducer,
    diagramPage: diagramReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

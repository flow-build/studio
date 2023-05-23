import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import comparePageReducer from "store/slices/compare-page";
import diagramReducer from "store/slices/diagram";
import dialogReducer from "store/slices/dialog";
import filterReducer from "store/slices/filter";
import historyReducer from "store/slices/process-history";
import processBarReducer from "store/slices/process-bar";
import processIdReducer from "store/slices/process-id";
import settingsReducer from "store/slices/settings";
import workflowPageReducer from "store/slices/workflow-page";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    workflowPage: workflowPageReducer,
    comparePage: comparePageReducer,
    diagramPage: diagramReducer,
    dialogPage: dialogReducer,
    processBar: processBarReducer,
    processHistory: historyReducer,
    processId: processIdReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

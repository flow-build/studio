import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

import filterReducer from 'store/slices/filter'
import comparePageReducer from 'store/slices/compare-page'
import workflowPageReducer from 'store/slices/workflow-page'

/* TODO: Código legado. Necessário refatorar o diagrama */
import { bpmnService } from 'pages/diagram/services/bpmnService';
import { workflowService } from 'pages/diagram/services/workflowService';
import { bpmnSliceReducer, notificationsSliceReducer } from 'pages/diagram/features';

/* TODO: Código legado. Necessário refatorar o diagrama */
const legacyReducer = {
  [workflowService.reducerPath]: workflowService.reducer,
  [bpmnService.reducerPath]: bpmnService.reducer,
  bpmn: bpmnSliceReducer,
  notifications: notificationsSliceReducer
}

/* TODO: Código legado. Necessário refatorar o diagrama */
const legacyMiddleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware<any>) => getDefaultMiddleware().concat([
  workflowService.middleware,
  bpmnService.middleware
])

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    workflowPage: workflowPageReducer,
    comparePage: comparePageReducer,
    ...legacyReducer
  },
  middleware: legacyMiddleware
});

export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch);
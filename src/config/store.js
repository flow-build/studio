import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { workflowService } from 'services/workflowService'
import { bpmnService } from 'services/bpmnService'
import { bpmnSliceReducer, notificationsSliceReducer } from 'features'

export const store = configureStore({
    reducer: {
        [workflowService.reducerPath]: workflowService.reducer,
        [bpmnService.reducerPath]: bpmnService.reducer,
        bpmn: bpmnSliceReducer,
        notifications: notificationsSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        workflowService.middleware,
        bpmnService.middleware
    ])
})

setupListeners(store.dispatch)
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { workflowService } from 'services/workflowService'

export const store = configureStore({
    reducer: {
        [workflowService.reducerPath]: workflowService.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        workflowService.middleware
    ])
})

setupListeners(store.dispatch)
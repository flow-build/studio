import { configureStore } from '@reduxjs/toolkit'

import WorkflowManagerSlice from '@flowbuild/redux-toolkit-workflow-manager/workflowManager.slice';

export default configureStore({
    reducer: {
        WorkflowManager: WorkflowManagerSlice(process.env.REACT_APP_BASE_URL)
    }
})


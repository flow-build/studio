import { lazy } from 'react'

const Pages = {
    Dashboard: lazy(() => import('./Dashboard/Dashboard')),
    Workflows: lazy(() => import('./Workflows/Workflows')),
    WorkflowById: lazy(() => import ('./WorkflowById/WorkflowById')),
    History: lazy(() => import('./History/History')),
    Diagram: lazy(() => import('./Diagram/Diagram'))
}

export default Pages
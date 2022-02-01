import { lazy } from 'react'

const Pages = {
    Dashboard: lazy(() => import('./Dashboard/Dashboard')),
    History: lazy(() => import('./History/History')),
    Login: lazy(() => import('./Login/Login')),
    Workflows: lazy(() => import('./Workflows/Workflows')),
    WorkflowById: lazy(() => import ('./WorkflowById/WorkflowById')),
    Diagram: lazy(() => import('./Diagram/Diagram')),
    DiagramCreate: lazy(() => import('./DiagramCreate/DiagramCreate'))
}

export default Pages
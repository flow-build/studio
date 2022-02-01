import React from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'

import Pages from '../pages'
import { Layout } from 'components'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Pages.Login />} />
            <Route path="/" exact element={<Layout />} >
                <Route path="/" element={<Pages.Dashboard />} />
                <Route path="/workflows" element={<Pages.Workflows />} />
                <Route path="workflow" element={<Outlet />} >
                    <Route path=":id" element={<Pages.WorkflowById />} />
                </Route>
                <Route path="/history/:id" element={<Pages.History />} />
                <Route path="diagram" element={<Outlet />} >
                    <Route path=":id" element={<Pages.Diagram />} />
                    <Route path="create" element={<Pages.DiagramCreate />} />
                </Route>
            </Route>            
        </Routes>
    )
}

export default AppRoutes
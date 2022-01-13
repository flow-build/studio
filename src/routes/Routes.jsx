import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Pages from '../pages'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Pages.Dashboard />} />
            <Route path="/workflows" element={<Pages.Workflows />} />
            <Route path="/workflow/:id" element={<Pages.WorkflowById />} />
            <Route path="/history/:id" element={<Pages.History />} />
            <Route path="/diagram/:id" element={<Pages.Diagram />} />
        </Routes>
    )
}

export default AppRoutes
import { lazy } from 'react'
import { BrowserRouter, Route, Routes/* , Outlet */ } from 'react-router-dom'

export const Pages = {
  Dashboard: lazy(() => import('../pages/dashboard').then(module => ({ default: module.Dashboard }))),
  SignIn: lazy(() => import('../pages/sign/sign-in').then(module => ({ default: module.SignIn }))),

  Workflows: lazy(() => import('../pages/workflows').then(module => ({ default: module.Workflows }))),
  Processes: lazy(() => import('../pages/processes').then(module => ({ default: module.Processes }))),
  History: lazy(() => import('../pages/history').then(module => ({ default: module.History }))),
  Diagram: lazy(() => import('../pages/diagram').then(module => ({ default: module.Diagram })))
}

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages.SignIn />} />
        <Route path="dashboard" element={<Pages.Dashboard />}>
          <Route path="workflows" element={<Pages.Workflows />} />
          <Route path="workflows/:id/processes" element={<Pages.Processes />} />
          <Route path="workflows/:id/processes/:process_id/history" element={<Pages.History />} />
          <Route path="workflows/:id/diagram" element={<Pages.Diagram />} />

          <Route path="workflows/:id/diagram" element={<Pages.Diagram />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
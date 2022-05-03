// import { lazy } from 'react'
import { BrowserRouter, Route, Routes/* , Outlet */ } from 'react-router-dom'

import { Dashboard } from 'pages/dashboard'
import { SignIn } from 'pages/sign/sign-in'

import { Search } from 'pages/search'
import { Workflows } from 'pages/workflows'
import { Processes } from 'pages/processes'
import { History } from 'pages/history'
import { Diagram } from 'pages/diagram'

/* export const Pages = {
  Dashboard: lazy(() => import('../pages/dashboard').then(module => ({ default: module.Dashboard }))),
  SignIn: lazy(() => import('../pages/sign/sign-in').then(module => ({ default: module.SignIn }))),

  Search: lazy(() => import('../pages/search').then(module => ({ default: module.Search }))),

  Workflows: lazy(() => import('../pages/workflows').then(module => ({ default: module.Workflows }))),
  Processes: lazy(() => import('../pages/processes').then(module => ({ default: module.Processes }))),
  History: lazy(() => import('../pages/history').then(module => ({ default: module.History }))),
  Diagram: lazy(() => import('../pages/diagram').then(module => ({ default: module.Diagram })))
} */

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="workflows" element={<Workflows />} />
          <Route path="workflows/:id/processes" element={<Processes />} />
          <Route path="workflows/:id/processes/:process_id/history" element={<History />} />
          <Route path="workflows/:id/diagram" element={<Diagram />} />

          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
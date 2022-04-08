import { lazy } from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

const Pages = {
  Dashboard: lazy(() => import('../domain/dashboard').then(module => ({ default: module.Dashboard }))),
  SignIn: lazy(() => import('../domain/sign/sign-in').then(module => ({ default: module.SignIn })))
}

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages.SignIn />} />
        <Route path="/dashboard" element={<Pages.Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
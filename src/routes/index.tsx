import { lazy } from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

const Pages = {
  SignIn: lazy(() => import('../domain/sign/sign-in').then(module => ({ default: module.SignIn })))
}

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages.SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
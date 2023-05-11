import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import _isEmpty from "lodash/isEmpty";

import { Dashboard } from "pages/dashboard";
import { Workflows } from "pages/workflows";
import { CompareJson } from "pages/compare-json";
import { Processes } from "pages/processes";
import { History } from "pages/history";
import { DiagramRefactored } from "pages/diagram";
import { ForgotPassword } from "pages/auth/forgot-password";
import { Metabase } from "pages/metabase";
import { Nodes } from "pages/nodes";
import { Settings } from "pages/settings";
import { SignIn } from "pages/auth/sign-in";
import { SignUp } from "pages/auth/sign-up";
import { Error } from "pages/auth/error";
import { ConfirmationCode } from "pages/auth/confirmation-code";

import { getStorageItem } from "shared/utils/storage";

export const AppRoutes = () => {
  function handleSignIn() {
    const hasEnv =
      !_isEmpty(process.env.REACT_APP_BASE_URL);

    const hasLocalStorage = !_isEmpty(getStorageItem("SERVER_URL"));

    if (hasEnv || hasLocalStorage) {
      return <SignIn />;
    }

    return <Navigate to="settings" replace />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={handleSignIn()} />
        <Route path="settings" element={<Settings />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="error" element={<Error />} />
        <Route path="confirmation-code" element={<ConfirmationCode />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Metabase />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="workflows/:id/processes" element={<Processes />} />
          <Route
            path="workflows/:id/processes/:process_id/history"
            element={<History />}
          />
          <Route
            path="workflows/:workflowId/diagram/:id"
            element={<DiagramRefactored />}
          />
          <Route path="compare-json" element={<CompareJson />} />
          <Route path="nodes" element={<Nodes />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

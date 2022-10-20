import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import _isEmpty from "lodash/isEmpty";

import { Dashboard } from "pages/dashboard";
import { Register } from "pages/register/register";
import { Workflows } from "pages/workflows";
import { CompareJson } from "pages/compare-json";
import { Processes } from "pages/processes";
import { History } from "pages/history";
import { DiagramRefactored } from "pages/diagram";
import { Metabase } from "pages/metabase";
import { Nodes } from "pages/nodes";
import { Settings } from "pages/settings";

import { getStorageItem } from "shared/utils/storage";


export const AppRoutes = () => {
  function handleSignIn() {
    const hasEnv = !_isEmpty(
      `${process.env.REACT_APP_BASE_URL}${":"}${process.env.REACT_APP_URL_PORT}`
    );

    const hasLocalStorage = !_isEmpty(getStorageItem("SERVER_URL"));

    if (hasEnv || hasLocalStorage) {
      return <Register />;
    }

    return <Navigate to="settings" replace />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={handleSignIn()} />
        <Route path="settings" element={<Settings />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Metabase />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="workflows/:id/processes" element={<Processes />} />
          <Route
            path="workflows/:id/processes/:process_id/history"
            element={<History />}
          />
          <Route
            path="workflows/:workflowId/diagram"
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

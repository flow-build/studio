import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Dashboard } from "pages/dashboard";
import { SignIn } from "pages/sign/sign-in";
import { Workflows } from "pages/workflows";
import { Processes } from "pages/processes";
import { CompareState } from "pages/compare-state";
import { History } from "pages/history";
import { DiagramRefactored } from "pages/diagram";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="dashboard" element={<Dashboard />}>
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
          <Route path="compare-state" element={<CompareState />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

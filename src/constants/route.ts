export enum RoutePath {
  SIGN_IN = "/",
  DASHBOARD = "dashboard",
  WORKFLOW_LIST = "workflows",
  PROCESS_LIST = "workflows/:id/processes",
  HISTORY_LIST = "workflows/:id/processes/:process_id/history",
  DIAGRAM = "workflows/:workflowId/diagram",
  COMPARE_JSON = "compare-json",
}

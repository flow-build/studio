export type TWorkflow = {
  blueprint_spec: { [key: string]: any };
  created_at: string;
  description: string;
  hash: string;
  name: string;
  totalDiagrams: number;
  version: number;
  workflow_id: string;
  isLatest: boolean;
};

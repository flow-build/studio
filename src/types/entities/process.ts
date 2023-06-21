import { State } from './state';

export interface Process {
  id: string;
  created_at: string;
  workflow_id: string;
  status: string;
  state: State;
}

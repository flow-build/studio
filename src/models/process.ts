import { TState } from "models/state";

export type TProcess = {
  created_at: string;
  id: string;
  state: TState;
  status: string;
  workflow: {
    id: string;
  };
};

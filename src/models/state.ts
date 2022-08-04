export type TState = {
  actor_data: { [key: string]: any };
  bag: { [key: string]: any };
  created_at: string;
  engine_id: string;
  environment?: string;
  error: null /* TODO: Rever */;
  external_input: null;
  id: string;
  next_node_id: string | null;
  node_id: string;
  node_name: string;
  process_id: string;
  result: any /* TODO: Rever */;
  status: string /* TODO: Rever */;
  step_number: number;
  time_elapsed: string;
};

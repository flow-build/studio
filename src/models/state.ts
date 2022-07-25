export type TState = {
  id: string;
  next_node_id: string | null;
  node_id: string;
  node_name: string;
  step_number: number;
  actor_data: { [key: string]: any };
  bag: { [key: string]: any };
  created_at: string;
  engine_id: string;
  error: null; /* TODO: Rever */
  external_input: null;
  process_id: string;
  result: any; /* TODO: Rever */
  status: string; /* TODO: Rever */
  time_elapsed: string;
}
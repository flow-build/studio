import { TState } from "models/state";

import { api } from "services/api";

export async function getProps(activity_manager_id: string): Promise<TState[]> {
    try {
        const { data } = await api.get(`/processes/activityManager/bc847f70-2371-11ed-983d-9315e6682be4`)
        return data;
      } catch (error) {
        throw new Error("Erro ao tentar visualizar as props")
      }  
}

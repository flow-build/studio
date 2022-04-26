import { api } from "services/api"

type TResponse = {
  process_id: string;
  workflow: { id: string; name: string; version: number }
}

export async function createProcessByName(name: string): Promise<TResponse> {
  try {
    const { data } = await api.post<TResponse>(`workflows/name/${name}/start`);
    return data
  } catch (error) {
    throw new Error('Erro ao tentar criar processo!')
  }
}
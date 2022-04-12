import { TWorkflow } from "models/workflow";

import { api } from "services/api";

export async function listWorkflows(): Promise<TWorkflow[]> {
  try {
    const { data } = await api.get('/workflows');
    return data;
  } catch (error) {
    throw new Error('Erro ao listar workflows')
  }
}
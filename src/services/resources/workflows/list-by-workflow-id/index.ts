import { api } from "services/api"

export async function listByWorkflowId(workflowId: string) {
  try {
    const { data } = await api.post('/workflows/diagram', { workflow_id: workflowId })
    return data;
  } catch (error) {
    throw new Error('Erro ao listar diagrama pelo workflow id')
  }
}
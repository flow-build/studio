import _isEmpty from "lodash/isEmpty";

import { TWorkflow } from "models/workflow";

import { api } from "services/api";

function filterWorkflowByName(workflowName: string, name: string) {
  return workflowName.includes(name);
}

function filterWorkflowById(workflowId: string, id: string) {
  return workflowId.includes(id);
}

function filterWorkflow(workflow: TWorkflow, search: string) {
  const name = workflow.name;
  const id = workflow.workflow_id;

  return filterWorkflowByName(name, search) || filterWorkflowById(id, search);
}

export async function listWorkflows(params?: {
  search: string;
}): Promise<TWorkflow[]> {
  try {
    const { data } = await api.get<TWorkflow[]>("/workflows");

    if (_isEmpty(params?.search)) {
      return data;
    }

    return data.filter((workflow) =>
      filterWorkflow(workflow, params?.search.trim() as string)
    );
  } catch (error) {
    throw new Error("Erro ao listar workflows");
  }
}

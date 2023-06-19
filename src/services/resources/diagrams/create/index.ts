import { api } from "services/api/diagrams";

export interface ICreateDiagram {
  name: string;
  isDefault: boolean;
  workflowId: string;
  userId: string;
  xml: string;
}

export async function create(createDiagram: ICreateDiagram) {
  try {
    const { data } = await api.post("/diagram", {
      name: createDiagram.name,
      isDefault: createDiagram.isDefault,
      workflowId: createDiagram.workflowId,
      userId: createDiagram.userId,
      xml: createDiagram.xml,
    });
    return data;
  } catch (error) {
    throw new Error("Erro ao salvar diagrama");
  }
}

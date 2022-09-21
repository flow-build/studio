import { api } from "services/api/diagrams";

export interface ICreateDiagram {
  name: string;
  workflowId: string;
  userId: string;
  xml: any;
}

export async function create(createDiagram: ICreateDiagram) {
  try {
    const { data } = await api.post("/diagrams", {
      name: createDiagram.name,
      workflow_id: createDiagram.workflowId,
      user_id: createDiagram.userId,
      diagram_xml: createDiagram.xml,
    });
    return data;
  } catch (error) {
    throw new Error("Erro ao salvar diagrama");
  }
}

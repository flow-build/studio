import { api } from "../../../api/diagrams/index";

export interface IParams {
  id: string;
  name: string;
  xml: string;
}

export async function edit(params: IParams) {
  try {
    const { data } = await api.patch(`/diagrams/${params.id}`, {
      name: params.name,
      diagram_xml: params.xml,
    });
    return data;
  } catch (error) {
    console.error("Erro ao editar os diagramas", error);
  }
}

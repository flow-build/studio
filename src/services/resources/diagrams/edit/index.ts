import { api } from "services/api/diagrams";

export interface IParams {
  id: string;
  name: string;
  xml: string;
}

export async function edit(params: IParams) {
  try {
    const { data } = await api.patch(`/diagram/${params.id}`, {
      name: params.name,
      xml: params.xml,
    });
    return data;
  } catch (error) {
    console.error("Erro ao editar os diagramas", error);
  }
}

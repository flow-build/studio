import { apiDiagrams } from "services/api/diagrams";

export async function saveDiagramName(xml: string, userId: string, name: string) {
    try {
      const { data } = await apiDiagrams.post('/diagrams', {name: name,
      user_id: userId,
      diagram_xml: xml});
      return data;
    } catch (error) {
      throw new Error("Erro ao salvar diagrama");
    }
  }
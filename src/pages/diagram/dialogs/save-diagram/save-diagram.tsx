import { useEffect, useState } from "react";
import { saveDiagramName } from "services/resources/diagrams/save-diagram";

import * as S from "./styles";
import { IDiagram } from "./types/IDiagram";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const SaveDiagram: React.FC<Props> = ({ isOpen, onClose }) => {
  const [saveDiagram, setSaveDiagram] = useState<IDiagram>({
    name: "",
    userId: "",
    xml: "",
  });

  useEffect(() => {
    const request = async () => {
      const response = await saveDiagramName(
        saveDiagram.name,
        saveDiagram.userId,
        saveDiagram.xml
      );
      setSaveDiagram(response);
    };
    if (isOpen) {
      request();
    }
  }, [isOpen, saveDiagram.name, saveDiagram.userId, saveDiagram.xml]);

  // function diagramName(name) {
  //   setSaveDiagram();
  // }

  return (
    <S.DiagramWrapper open={isOpen} onClose={onClose}>
      <S.DiagramTitle>
        Salvar Diagrama
        <S.CloseDiagramButton onClick={onClose} />
      </S.DiagramTitle>
      <S.DiagramContent>
        <S.DiagramInput
          value={saveDiagram?.name}
          // onChange={(event) => {
          //   onChangeProcesses(event.target.value, "nodeId");
          // }}
        />
      </S.DiagramContent>
      <S.DiagramDivider />
      <S.ButtonWrapper>
        <S.CancelDiagramButton> Cancelar </S.CancelDiagramButton>
        <S.ButtonDivider />
        <S.SaveDiagramButton> Salvar</S.SaveDiagramButton>
      </S.ButtonWrapper>
    </S.DiagramWrapper>
  );
};

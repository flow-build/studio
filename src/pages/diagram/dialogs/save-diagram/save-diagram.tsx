import { useState } from "react";

import { saveDiagramName } from "services/resources/diagrams/save-diagram";
import { IDiagram } from "./types/IDiagram";

import * as S from "./styles";

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

  const onChangeDiagramName = (
    valor: string,
    campo: "name" | "userId" | "xml"
  ) => {
    setSaveDiagram((prev) => ({ ...prev, [campo]: valor }));
  };

  async function handleClickDiagramName(name: any) {
    const response = await saveDiagramName(saveDiagram.name, saveDiagram.userId,saveDiagram.xml );

    setSaveDiagram(response);
  }

  return (
    <S.DiagramWrapper open={isOpen} onClose={onClose}>
      <S.DiagramTitle>
        Salvar Diagrama
        <S.CloseDiagramButton onClick={onClose} />
      </S.DiagramTitle>
      <S.DiagramContent>
        <S.DiagramInput
          value={saveDiagram?.name}
          onChange={(event) => {
            onChangeDiagramName(event.target.value, "name");
          }}
        />
      </S.DiagramContent>
      <S.DiagramDivider />
      <S.ButtonWrapper>
        <S.CancelDiagramButton onClick={onClose}>
          {" "}
          Cancelar{" "}
        </S.CancelDiagramButton>
        <S.ButtonDivider />
        <S.SaveDiagramButton onClick={handleClickDiagramName}>
          {" "}
          Salvar
        </S.SaveDiagramButton>
      </S.ButtonWrapper>
    </S.DiagramWrapper>
  );
};

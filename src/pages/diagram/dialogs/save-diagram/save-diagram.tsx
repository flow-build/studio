import { useState } from "react";

import { ICreateDiagram } from "pages/diagram/dialogs/save-diagram/types/ICreateDiagram";

import * as S from "./styles";
import { create } from "services/resources/diagrams/create";
import { useSnackbar } from "notistack";
import { useDiagram } from "pages/diagram/hooks/useDiagram";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SaveDiagram: React.FC<Props> = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const diagram = useDiagram();
  
  
  const [update, setUpdate] = useState<ICreateDiagram>({
    name: "",
    workflowId: "5dbe5ef7-1158-44ea-a148-6ad5b2d78cb1",
    userId: "e9f53410-35e4-11ed-983d-9315e6682be4",
    xml: diagram.initialElements,
  });

  const onChangeDiagramName = (
    valor: string,
    campo: "name" | "workflowId" | "userId" | "xml"
  ) => {
    setUpdate((prev) => ({ ...prev, [campo]: valor }));
  };

  function createDiagramSuccess(message: string) {
    enqueueSnackbar(`Diagrama ${message} criado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function handleClickDiagramName() {
    console.log(update);
    const diagramName = update?.name;
    const response = await create({
      name: update.name,
      workflowId: update.workflowId,
      userId: update.userId,
      xml: update.xml,
    });

    createDiagramSuccess(diagramName);
    console.log(response, "response");

    return;
  }

  return (
    <S.DiagramWrapper open={isOpen} onClose={onClose}>
      <S.DiagramTitle>
        Salvar Diagrama
        <S.CloseDiagramButton onClick={onClose} />
      </S.DiagramTitle>
      <S.DiagramContent>
        <S.DiagramInput
          value={update?.name}
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

import { useState } from "react";
import { useParams } from "react-router-dom";

import { getStorageItem } from "shared/utils/storage";
import { IPayload } from "pages/diagram/dialogs/save-diagram/types/IPayload";
import { create } from "services/resources/diagrams/create";
import { useDiagram } from "pages/diagram/hooks/useDiagram";

import { useSnackbar } from "notistack";

import jwt_decode from "jwt-decode";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SaveDiagram: React.FC<Props> = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const diagram = useDiagram();
  const { workflowId } = useParams();

  function getUserInfo() {
    const token = getStorageItem("TOKEN");
    const decoded = jwt_decode(token);
    console.log(decoded, "decoded");
    return decoded;
  }

  const [payload, setPayload] = useState<IPayload>({
    name: "",
  });

  const onChangeDiagramName = (valor: string, campo: "name") => {
    setPayload((prev) => ({ ...prev, [campo]: valor }));
  };

  function createDiagramSuccess(message: string) {
    enqueueSnackbar(`Diagrama ${message} criado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function handleClickDiagramName() {
    console.log(payload);
    const info = getUserInfo();
    console.log(info);
    const diagramName = payload?.name;

    const response = await create({
      name: payload.name,
      workflowId: workflowId as string,
      userId: info.actor_id,
      xml: diagram,
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
          value={payload?.name}
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

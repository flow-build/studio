import { useState } from "react";
import { useParams } from "react-router-dom";

import { getStorageItem } from "shared/utils/storage";
import { IPayload } from "pages/diagram/dialogs/save-diagram/types/IPayload";
import { create } from "services/resources/diagrams/create";

import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";

import * as S from "./styles";
import { TUser } from "models/user";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  xml: string;
};

export const SaveDiagram: React.FC<Props> = ({ isOpen, onClose, xml }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { workflowId } = useParams();

  function getUserInfo() {
    const token = getStorageItem("TOKEN");
    const decoded = jwt_decode(token) as TUser;
    return decoded;
  }

  const [payload, setPayload] = useState<IPayload>({
    name: "",
  });

  const onChangeDiagramName = (valor: string, campo: keyof IPayload) => {
    setPayload((prev) => ({ ...prev, [campo]: valor }));
  };

  function createDiagramSuccess(message: string) {
    enqueueSnackbar(`Diagrama ${message} criado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function handleClickDiagramName() {
    const info = getUserInfo();

    const diagramName = payload?.name;

    await create({
      name: payload.name,
      workflowId: workflowId as string,
      userId: info.actor_id,
      xml,
    });

    createDiagramSuccess(diagramName);
  }

  return (
    <S.DiagramWrapper open={isOpen} onClose={onClose}>
      <S.DiagramBackground>
        <S.DiagramTitle>
          Salvar Diagrama
          <S.CloseDiagramButton onClick={onClose} />
        </S.DiagramTitle>

        <S.DiagramContent>
          <S.DiagramInput
            value={payload?.name}
            onChange={(event) =>
              onChangeDiagramName(event.target.value, "name")
            }
          />
        </S.DiagramContent>

        <S.DiagramDivider />

        <S.ButtonWrapper>
          <S.CancelDiagramButton onClick={onClose}>
            Cancelar
          </S.CancelDiagramButton>

          <S.ButtonDivider />

          <S.SaveDiagramButton onClick={handleClickDiagramName}>
            Salvar
          </S.SaveDiagramButton>
        </S.ButtonWrapper>
      </S.DiagramBackground>
    </S.DiagramWrapper>
  );
};

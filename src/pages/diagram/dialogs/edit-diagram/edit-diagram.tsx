import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getStorageItem, setStorageItem } from "shared/utils/storage";

import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";

import * as S from "./styles";
import { IEdit } from "./types/IEdit";
import { edit } from "services/resources/diagrams/edit";
import { useDiagram } from "pages/diagram/hooks/useDiagram";
import { TUser } from "models/user";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  xml: string;
};

export const EditDiagram: React.FC<Props> = ({ isOpen, onClose, xml }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { workflowId } = useParams();

  const diagram = useDiagram();
  const navigate = useNavigate();

  function getUserInfo() {
    const token = getStorageItem("TOKEN");
    const decoded = jwt_decode(token) as TUser;
    setStorageItem("TOKEN", token);
    return decoded;
  }

  const [payload, setPayload] = useState<IEdit>({
    name: "",
    xml: "",
  });

  console.log(payload, 'payload');

  const onChangeDiagram = async (valor: string, campo: keyof IEdit) => {
    setPayload((prev) => ({ ...prev, [campo]: valor }));
  };

  function updateDiagramSuccess(message: string) {
    enqueueSnackbar(`Diagrama ${message} editado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function handleClickDiagramUpdate() {
    const info = getUserInfo();
    console.log(info);

    const diagramName = payload?.name;

    const response = await edit({
      name: payload.name,
      id: info.id,
      xml,
    });

    console.log(response, "RESPONSE");

    updateDiagramSuccess(diagramName);

    if (onClose) {
      onClose();
    }
  }

  return (
    <S.DiagramWrapper open={isOpen} onClose={onClose}>
      <S.DiagramBackground>
        <S.DiagramTitle>
          Editar Diagrama
          <S.CloseDiagramButton onClick={onClose} />
        </S.DiagramTitle>

        <S.DiagramContent>
          <S.DiagramInputName
            value={payload?.name}
            onChange={(event) => onChangeDiagram(event.target.value, "name")}
          />
          <S.DiagramInputXml
            value={payload?.xml}
            onChange={(event) => onChangeDiagram(event.target.value, "xml")}
          />
        </S.DiagramContent>

        <S.DiagramDivider />

        <S.ButtonWrapper>
          <S.CancelDiagramButton onClick={onClose}>
            Cancelar
          </S.CancelDiagramButton>

          <S.ButtonDivider />

          <S.SaveDiagramButton onClick={handleClickDiagramUpdate}>
            Salvar
          </S.SaveDiagramButton>
        </S.ButtonWrapper>
      </S.DiagramBackground>
    </S.DiagramWrapper>
  );
};

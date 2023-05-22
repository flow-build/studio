import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";

import { TUser } from "models/user";

import { create } from "services/resources/diagrams/create";

import { SessionStorage } from "shared/utils/base-storage/session-storage";

import * as S from "./styles";
import { useDiagram } from "pages/diagram/hooks/useDiagram";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  xml: string;
};

export const SaveDiagram: React.FC<Props> = ({ isOpen, onClose, xml }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { workflowId } = useParams();
  const diagram = useDiagram();

  function getUserInfo() {
    const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

    if (!token) {
      return;
    }

    const decoded = jwt_decode(token) as TUser;
    SessionStorage.getInstance().setValue("TOKEN", token);
    return decoded;
  }

  function createDiagramSuccess(message: string) {
    enqueueSnackbar(`Diagrama ${message} criado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function handleClickDiagramName() {
    const info = getUserInfo();

    if (!info) {
      return;
    }

    const diagramName = diagram.payload.name;

    await create({
      name: diagramName,
      isDefault: diagram.payload.isDefault,
      workflowId: workflowId as string,
      userId: info.actor_id,
      xml,
    });

    createDiagramSuccess(diagramName);

    if (onClose) {
      onClose();
    }
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
            value={diagram.payload.name}
            onChange={(event) =>
              diagram.onChangeDiagram(event.target.value, "name")
            }
          />
          <S.CheckboxWrapper>
            <S.DiagramCheckbox
              aria-label="Default?"
              checked={diagram.payload.isDefault}
              onChange={(event) =>
                diagram.onChangeDiagram(event.target.checked, "isDefault")
              }
            />
          </S.CheckboxWrapper>
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

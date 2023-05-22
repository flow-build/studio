import { edit } from "services/resources/diagrams/edit";

import { useDiagram } from "pages/diagram/hooks/useDiagram";

import jwt_decode from "jwt-decode";
import { SessionStorage } from "shared/utils/base-storage/session-storage";

import { useSnackbar } from "notistack";

import * as S from "./styles";
import { create } from "services/resources/diagrams/create";
import { useParams } from "react-router-dom";
import { TUser } from "models/user";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
  xml: string;
};

export const EditDiagram: React.FC<Props> = ({ isOpen, onClose, id }) => {
  const { enqueueSnackbar } = useSnackbar();

  const diagram = useDiagram();
  const { workflowId } = useParams();

  function updateOrCreateDiagramSuccess(message: string, isEdit: boolean) {
    const msgSuccess = isEdit
      ? `Diagrama ${message} editado!`
      : `Diagrama ${message} criado!`;

    enqueueSnackbar(msgSuccess, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  function getUserInfo() {
    const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

    if (!token) {
      return;
    }

    const decoded = jwt_decode(token) as TUser;
    SessionStorage.getInstance().setValue("TOKEN", token);
    return decoded;
  }

  async function treatEditOrCreate(
    name: string,
    isDefault: boolean,
    id: string,
    xml: string
  ) {
    const info = getUserInfo();
    if (!info) {
      return;
    }

    if (id !== "undefined") {
      await edit({
        name: name,
        isDefault: isDefault,
        id,
        xml: xml,
      });

      updateOrCreateDiagramSuccess(name, true);
    } else {
      await create({
        name: name,
        isDefault: isDefault,
        workflowId: workflowId as string,
        userId: info.actor_id,
        xml,
      });

      updateOrCreateDiagramSuccess(name, false);
    }
  }

  async function handleClickDiagramUpdate() {
    const { xml } = await diagram.modeler.saveXML();

    await treatEditOrCreate(
      diagram.payload.name,
      diagram.payload.isDefault,
      id,
      xml
    );

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

          <S.SaveDiagramButton onClick={handleClickDiagramUpdate}>
            Salvar
          </S.SaveDiagramButton>
        </S.ButtonWrapper>
      </S.DiagramBackground>
    </S.DiagramWrapper>
  );
};

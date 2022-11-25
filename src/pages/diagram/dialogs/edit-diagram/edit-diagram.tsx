import { useCallback, useEffect, useState } from "react";

import { IEdit } from "./types/IEdit";
import { edit } from "services/resources/diagrams/edit";

import { useSnackbar } from "notistack";

import * as S from "./styles";
import { useDiagram } from "pages/diagram/hooks/useDiagram";
import { useDispatch, useSelector } from "react-redux";
import { setDiagramElement, setDiagramSelected } from "store/slices/dialog";
import { RootState } from "store";
import { useParams } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
};

export const EditDiagram: React.FC<Props> = ({ isOpen, onClose, id }) => {
  const { enqueueSnackbar } = useSnackbar();

  const diagram = useDiagram();
  const dispatch = useDispatch();

  const {workflowId} = useParams();

  const [payload, setPayload] = useState<IEdit>({
    id,
    name: "",
    xml: "",
  });

  console.log("payload", payload);

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
    const diagramName = payload?.name;

    const { xml } = await diagram.modeler.saveXML();
    console.log("xml", { xml });

    const response = await edit({
      name: payload.name,
      id,
      xml: xml,
    });

    diagram.modeler.importXML(response)
    setPayload(response)

    console.log("RESPONSE", response);

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

          <S.DiagramInputId
            value={payload?.id}
            onChange={(event) => onChangeDiagram(event.target.value, "id")}
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

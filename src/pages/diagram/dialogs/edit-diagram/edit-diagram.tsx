import { useState } from "react";

import { edit } from "services/resources/diagrams/edit";
import { IEdit } from "./types/IEdit";

import { useDiagram } from "pages/diagram/hooks/useDiagram";

import { useSnackbar } from "notistack";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
};

export const EditDiagram: React.FC<Props> = ({ isOpen, onClose, id }) => {
  const { enqueueSnackbar } = useSnackbar();

  const diagram = useDiagram();

  const [payload, setPayload] = useState<IEdit>({
    id,
    name: "",
    isDefault: false,
    xml: "",
  });

  const onChangeDiagram = async (
    value: string | boolean,
    field: keyof IEdit
  ) => {
    setPayload((prev) => ({ ...prev, [field]: value }));
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

    const response = await edit({
      name: payload.name,
      isDefault: payload.isDefault,
      id,
      xml: xml,
    });

    setPayload(response);

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
          <S.CheckboxWrapper>
            <S.DiagramCheckbox
              aria-label="Default?"
              checked={payload?.isDefault}
              onChange={(event) =>
                onChangeDiagram(event.target.checked, "isDefault")
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

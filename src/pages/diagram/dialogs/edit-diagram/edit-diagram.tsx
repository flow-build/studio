import { edit } from "services/resources/diagrams/edit";

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

  function updateDiagramSuccess(message: string) {
    enqueueSnackbar(`Diagrama ${message} editado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function handleClickDiagramUpdate() {
    const diagramName = diagram.payload.name;

    const { xml } = await diagram.modeler.saveXML();

    await edit({
      name: diagram.payload.name,
      isDefault: diagram.payload.isDefault,
      id,
      xml: xml,
    });

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

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setSaveDialog } from "store/slices/diagram";
import { setEditDialog } from "store/slices/dialog";
import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const DiagramConfirmation: React.FC<Props> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { saveConfirmationDialog } = useSelector(
    (state: RootState) => state.diagramPage
  );

  function onSaveNewDiagram() {
    if (saveConfirmationDialog.isVisible) {
      dispatch(setSaveDialog({ isVisible: true }));
    }

    if (onClose) {
      onClose();
    }
  }

  function onSubscribeDiagram() {
    if (saveConfirmationDialog.isVisible) {
      dispatch(setEditDialog({ isVisible: true }));
    }

    if (onClose) {
      onClose();
    }
  }

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.ConfirmationBackground>
        <S.ConfirmationTitle>
          Salvar Diagrama
          <S.CloseConfirmationButton onClick={onClose} />
        </S.ConfirmationTitle>

        <S.ConfirmationDivider />

        <S.ButtonWrapperConfirmation>
          <S.SaveNewDiagramButton onClick={onSaveNewDiagram}>
            Salvar Novo Diagrama
          </S.SaveNewDiagramButton>

          <S.ButtonConfirmationDivider />

          <S.EditDiagramButton onClick={onSubscribeDiagram}>
            Sobrescrever Diagrama
          </S.EditDiagramButton>
        </S.ButtonWrapperConfirmation>
      </S.ConfirmationBackground>
    </S.Wrapper>
  );
};

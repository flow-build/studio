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
    <S.DiagramWrapper open={isOpen} onClose={onClose}>
      <S.DiagramBackground>
        <S.DiagramTitle>
          Salvar Diagrama
          <S.CloseDiagramButton onClick={onClose} />
        </S.DiagramTitle>

        <S.DiagramDivider />

        <S.ButtonWrapper>
          <S.CancelDiagramButton onClick={onSaveNewDiagram}>
            Salvar Novo Diagrama
          </S.CancelDiagramButton>

          <S.ButtonDivider />

          <S.SaveDiagramButton onClick={onSubscribeDiagram}>
            Sobrescrever Diagrama
          </S.SaveDiagramButton>
        </S.ButtonWrapper>
      </S.DiagramBackground>
    </S.DiagramWrapper>
  );
};

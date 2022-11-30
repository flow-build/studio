import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setDeleteDialog } from "store/slices/diagram";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const ConfirmationDelete: React.FC<Props> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { deleteConfirmationDialog } = useSelector(
    (state: RootState) => state.diagramPage
  );

  function onConfirmDelete() {
    if (deleteConfirmationDialog.isVisible) {
      dispatch(setDeleteDialog({ isVisible: true }));
    }

    if (onClose) {
      onClose();
    }
  }

  return (
    <S.ConfirmationDeleteWrapper open={isOpen} onClose={onClose}>
      <S.Background>
        <S.Title>
          Deseja deletar o diagrama selecionado?
          <S.CloseButton onClick={onClose} />
        </S.Title>

        <S.ConfirmationDeleteDivider/>

        <S.Container>
          <S.CancelDelete onClick={onClose}>Cancelar</S.CancelDelete>
          <S.DividerButton />
          <S.ConfirmDeleteButton onClick={onConfirmDelete}>
            Confirmar
          </S.ConfirmDeleteButton>
        </S.Container>
      </S.Background>
    </S.ConfirmationDeleteWrapper>
  );
};

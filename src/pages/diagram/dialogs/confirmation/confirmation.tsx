import { useSelector } from "react-redux";
import { RootState } from "store";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const Confirmation: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { confirmationDialog } = useSelector(
    (state: RootState) => state.diagramPage
  );

  function onConfirm() {
    if (confirmationDialog.data.onConfirm) {
      confirmationDialog.data.onConfirm();
    }

    if (confirmationDialog.data.navigateTo) {
      navigate(confirmationDialog.data.navigateTo);
    }

    if (onClose) {
      onClose();
    }
  }

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Confirmação
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <S.Content>
        <S.Text>{confirmationDialog.data.message}</S.Text>
      </S.Content>

      <S.ActionsContainer>
        <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
        <S.OkButton onClick={onConfirm}>Confirmar</S.OkButton>
      </S.ActionsContainer>
    </S.Wrapper>
  );
};

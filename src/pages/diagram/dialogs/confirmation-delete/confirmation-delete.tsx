import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

import { Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "shared/components/icon-button";

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
          <IconButton icon={CloseIcon} onClick={onClose} />
        </S.Title>

        <Divider/>

        <S.Container>
          <Button onClick={onClose}>Cancelar</Button>
          <Divider orientation="vertical" flexItem />
          <Button onClick={onConfirmDelete}>
            Confirmar
          </Button>
        </S.Container>
      </S.Background>
    </S.ConfirmationDeleteWrapper>
  );
};

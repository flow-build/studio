import { useState } from "react";
import { useParams } from "react-router-dom";

import { useSnackbar } from "notistack";

import * as S from "./styles";
import { TUser } from "models/user";
import { IDelete } from "./types/IDelete";
import { deleteDiagram } from "services/resources/diagrams/delete";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
};

export const DeleteDiagram: React.FC<Props> = ({ isOpen, onClose, id }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [payload, setPayload] = useState<IDelete>({
    name: "",
    id,
  });

  function deleteDiagramMessage(message: string) {
    enqueueSnackbar(`Diagrama ${message} deletado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function handleDeleteDiagram() {
    const diagramName = payload?.name;

    await deleteDiagram(id);

    deleteDiagramMessage(diagramName);

    if (onClose) {
      onClose();
    }
  }

  return (
    <S.DeleteWrapper open={isOpen} onClose={onClose}>
      <S.DiagramDeleteBackground>
        <S.DiagramDeleteTitle>
          Deletar Diagrama
          <S.CloseDiagram onClick={onClose} />
        </S.DiagramDeleteTitle>

        <S.DeleteDivider />

        <S.Wrapper>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>

          <S.DeleteButtonDivider />

          <S.DeleteDiagramButton onClick={handleDeleteDiagram}>
                Apagar
          </S.DeleteDiagramButton>
        </S.Wrapper>
      </S.DiagramDeleteBackground>
    </S.DeleteWrapper>
  );
};

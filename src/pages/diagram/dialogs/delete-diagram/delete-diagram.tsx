import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSnackbar } from "notistack";

import * as S from "./styles";
import { TUser } from "models/user";
import { deleteDiagram } from "services/resources/diagrams/delete";
import { listDiagramByWorkflowId } from "services/resources/diagrams/list-by-workflow-id";
import { useSelector } from "react-redux";
import { RootState } from "store";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
};

export const DeleteDiagram: React.FC<Props> = ({ isOpen, onClose, id }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { workflowId } = useParams();

  const [diagram, setDiagram] = useState<TUser | undefined>();
  
  const dialogPageState = useSelector((state: RootState) => state.dialogPage);

  function deleteDiagramMessage(message: string) {
    enqueueSnackbar(`Diagrama ${message} deletado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  useEffect(() => {
    const requestDiagram = async () => {
      await listDiagramByWorkflowId(workflowId as string);
      setDiagram(dialogPageState.diagramSelected);
    };

    requestDiagram();

  }, [dialogPageState.diagramSelected, workflowId]);

  async function handleDeleteDiagram() {
    const diagramName = diagram?.name;

    await deleteDiagram(id);

    deleteDiagramMessage(diagramName as string);

    if (onClose) {
      onClose();
    }
  }

  return (
    <S.DeleteWrapper open={isOpen} onClose={onClose}>
      <S.DiagramDeleteBackground>
        <S.DiagramDeleteTitle>
          Deletar diagrama {diagram?.name}?
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

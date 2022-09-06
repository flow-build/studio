import { useEffect, useState } from "react";

import { TWorkflow } from "models/workflow";
import { listByWorkflowId } from "services/resources/processes/list-by-process-id";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const SaveDiagram: React.FC<Props> = ({ isOpen, onClose }) => {
  const [process, setProcesses] = useState<TWorkflow[]>([]);

  function onClickListItemButton(process: TWorkflow) {
    if (onClose) {
      onClose();
    }
  }

  //   function getSubtitle(process: TWorkflow) {
  //     const { state, status } = process;
  //     return `${state.node_id} - ${status}`;
  //   }

  //   useEffect(() => {
  //     const request = async () => {
  //       const response = await listByWorkflowId(workflowId);
  //       setProcesses(response);
  //     };
  //     if (isOpen) {
  //       request();
  //     }
  //   }, [isOpen, workflowId]);

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.DiagramTitle>
        Salvar Diagrama
        <S.CloseDiagramButton onClick={onClose} />
      </S.DiagramTitle>

      <S.DiagramContent>
        <S.DiagramInput />
        <S.SaveDiagramButton />
      </S.DiagramContent>
    </S.Wrapper>
  );
};

import { useEffect, useState } from "react";

import { TWorkflow } from "models/workflow";

import { listWorkflowById } from "services/resources/workflows/list-by-id";

import statusOk from 'assets/images/latest-version-button/status-ok.svg'
import statusWarning from 'assets/images/latest-version-button/status-warning.svg'
import * as S from "./styles";

type Props = {
  workflowId: string; 
  isLastVersion: boolean;
};

export const Header: React.FC<Props> = ({ workflowId, isLastVersion }) => {
  const [workflow, setWorkflow] = useState<TWorkflow>();

  useEffect(() => {
    const request = async () => {
      const response = await listWorkflowById(workflowId);
      setWorkflow(response);
    };

    request();
  }, [workflowId]);

  if (!workflow) {
    return null;
  }

  return (
    <S.Wrapper>
      <S.TitleContent>
        <S.Title>Workflow: {workflow?.name}</S.Title>
        <S.Title>-</S.Title>
        <S.Title>Version: {workflow?.version}</S.Title>
      </S.TitleContent>

      {isLastVersion ? (
        <S.Tooltip title="Ultima versão">
          <S.Status>
            <img src={statusOk} alt="StatusOk" />
          </S.Status>
        </S.Tooltip>
      ) : (
        <S.Tooltip title="Atualizar versão">
          <S.Status>
            <img src={statusWarning}  alt="StatusWarning"/> 
          </S.Status>
        </S.Tooltip>
      )}
    </S.Wrapper>
  );
};

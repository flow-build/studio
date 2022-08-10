import { useEffect, useState } from "react";

import { TWorkflow } from "models/workflow";

import { listWorkflowById } from "services/resources/workflows/list-by-id";

import * as S from "./styles";

type Props = {
  workflowId: string;
};

export const Header: React.FC<Props> = ({ workflowId }) => {
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

      <S.Tooltip title="Última versão">
        <S.SyncIcon />
      </S.Tooltip>
    </S.Wrapper>
  );
};

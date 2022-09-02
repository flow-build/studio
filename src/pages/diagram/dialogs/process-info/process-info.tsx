import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import _first from "lodash/first";

import { TProcess } from "models/process";
import { TState } from "models/state";

import { getHistoryByProcessId } from "services/resources/processes/history";

import * as S from "./styles";
import { TWorkflow } from "models/workflow";
import { listWorkflowById } from "services/resources/workflows/list-by-id";

type Props = {
  isOpen: boolean;
  process: TProcess;
  onClose?: () => void;
};

export const ProcessInfo: FC<Props> = ({ isOpen, process, onClose }) => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState<{
    state: TState;
    workflow: TWorkflow;
  }>();

  useEffect(() => {
    const request = async () => {
      const response = await getHistoryByProcessId(process.id);
      const workflowId = process.workflow_id ?? (process as any)?.workflow.id;
      const workflow = await listWorkflowById(workflowId);

      setPayload({ state: _first(response) as TState, workflow });
    };

    request();
  }, [process]);

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Informações do processo
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <S.Content>
        <S.Text>Id: {process.id}</S.Text>
        <S.Text>Workflow name: {payload?.workflow.name}</S.Text>
        <S.Text>Node id: {process.state.node_id}</S.Text>
        <S.Text>Step: {process.state.step_number}</S.Text>

        <S.Editor
          value={JSON.stringify(
            {
              current_status: payload?.state?.status,
              step_number: payload?.state?.step_number,
              bag: payload?.state?.bag,
              result: payload?.state?.result,
              environment: payload?.state?.environment ?? null,
            },
            null,
            "\t"
          )}
        />
      </S.Content>

      <S.ActionsContainer>
        <S.OkButton
          onClick={() => {
            const workflowId =
              process.workflow_id ?? (process as any)?.workflow.id;

            navigate(
              `/dashboard/workflows/${workflowId}/processes/${process.id}/history`
            );
          }}
        >
          Ver histórico
        </S.OkButton>
      </S.ActionsContainer>
    </S.Wrapper>
  );
};

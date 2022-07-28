import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import _first from "lodash/first";

import { TProcess } from "models/process";
import { TState } from "models/state";

import { getHistoryByProcessId } from "services/resources/processes/history";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  process: TProcess;
  onClose?: () => void;
};

export const ProcessInfo: FC<Props> = ({ isOpen, process, onClose }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<TState>();

  useEffect(() => {
    const request = async () => {
      const response = await getHistoryByProcessId(process.id);
      console.log({ response });
      setState(_first(response));
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
        <S.Text>Workflow name:</S.Text>
        <S.Text>Node id: {process.state.node_id}</S.Text>
        <S.Text>Step: {process.state.step_number}</S.Text>

        <S.Text>Result</S.Text>
        <S.Editor value={JSON.stringify(state?.result, null, "\t")} />
      </S.Content>

      <S.ActionsContainer>
        <S.OkButton
          onClick={() =>
            navigate(
              `/dashboard/workflows/${process.workflow_id}/processes/${process.id}/history`
            )
          }
        >
          Ver histórico
        </S.OkButton>
      </S.ActionsContainer>
    </S.Wrapper>
  );
};

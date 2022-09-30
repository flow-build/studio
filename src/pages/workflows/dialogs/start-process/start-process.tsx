import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import _isEqual from "lodash/isEqual";

import { createProcessByName } from "services/resources/processes/create-by-name";
import { listWorkflowById } from "services/resources/workflows/list-by-id";

import { RootState } from "store";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const StartProcess: React.FC<Props> = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const workflowPageState = useSelector(
    (state: RootState) => state.workflowPage
  );

  const workflowId = workflowPageState.startProcessDialog.data.workflowId;
  const processName = workflowPageState.startProcessDialog.data.processName;

  const [inputSchema, setInputSchema] = useState();
  const [payload, setPayload] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  function showNotification(message: string) {
    enqueueSnackbar(`Processo ${message} criado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  function isValidJSONString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  async function onConfirm() {
    setIsLoading(true);

    const parsedPayload = JSON.parse(payload ?? "{}");
    const response = await createProcessByName(processName, parsedPayload);

    showNotification(processName);

    navigate(`${workflowId}/processes/${response.process_id}/history`);

    if (onClose) {
      onClose();
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (workflowId) {
      const request = async () => {
        const workflow = await listWorkflowById(workflowId);
        const nodeStart = workflow.blueprint_spec.nodes.find((node: any) =>
          _isEqual(node.type, "Start")
        );

        setInputSchema(nodeStart.parameters.input_schema);
      };

      request();
    }
  }, [workflowId]);

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Novo Processo
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <S.Content>
        <S.Text>
          Input Schema
          <S.Editor readOnly value={inputSchema} />
        </S.Text>

        <S.Text>
          Json Editor
          <S.Editor onChange={(newValue) => setPayload(newValue)} />
        </S.Text>
      </S.Content>

      <S.ActionsContainer>
        <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>

        <S.OkButton disabled={!isValidJSONString(payload)} onClick={onConfirm}>
          {isLoading && <S.Loading />}

          {!isLoading && <S.TextOkButton>Iniciar</S.TextOkButton>}
        </S.OkButton>
      </S.ActionsContainer>
    </S.Wrapper>
  );
};

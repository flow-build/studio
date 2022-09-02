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

  const [inputSchema, setInputSchema] = useState();
  const [payload, setPayload] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  function showNotification(message: string) {
    enqueueSnackbar(`Processo ${message} criado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  function errorNotification(message: string) {
    enqueueSnackbar("JSON inválido", {
      autoHideDuration: 2000,
      variant: "error",
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
    if (!isValidJSONString(payload)) {
      setIsLoading(false);
      errorNotification("");
      return;
    }
    setIsLoading(true);
    const processName = workflowPageState.startProcessDialog.data.processName;
    const workflowId = workflowPageState.startProcessDialog.data.workflowId;
    const response = await createProcessByName(
      processName,
      JSON.parse(payload ?? "{}")
    );
    showNotification(processName);
    setTimeout(() => {
      navigate(`${workflowId}/processes/${response.process_id}/history`);
    }, 2000);
    if (onClose) {
      onClose();
    }
  }

  useEffect(() => {
    const workflowId = workflowPageState.startProcessDialog.data.workflowId;

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
  }, [workflowPageState.startProcessDialog.data.workflowId]);

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Novo processo
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

        <S.OkButton onClick={onConfirm}>
          {isLoading ? <S.Loading /> : <S.Text>Iniciar</S.Text>}
        </S.OkButton>
      </S.ActionsContainer>
    </S.Wrapper>
  );
};

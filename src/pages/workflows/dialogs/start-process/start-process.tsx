import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";

import { createProcessByName } from "services/resources/processes/create-by-name";
import { listWorkflowById } from "services/resources/workflows/list-by-id";

import { RootState } from "store";

import { JSONSchema7 } from "json-schema";

import * as S from "./styles";
import { EmptyInputSchema } from "./components/empty-input-schema/empty-input-schema";
import { InputSchemaContent } from "./components/input-schema-content";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const StartProcess: React.FC<Props> = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const workflowPageState = useSelector(
    (state: RootState) => state.workflowPage
  );

  const [inputSchema, setInputSchema] = useState<JSONSchema7>();

  function showNotification(message: string) {
    enqueueSnackbar(`Processo ${message} criado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function onConfirm(payload: string) {
    const processName = workflowPageState.startProcessDialog.data.processName;
    const workflowId = workflowPageState.startProcessDialog.data.workflowId;
    const response = await createProcessByName(
      processName,
      JSON.parse(payload ?? "{}")
    );

    showNotification(processName);
    navigate(`${workflowId}/processes/${response.process_id}/history`);

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
        setInputSchema(nodeStart.parameters.input_schema as JSONSchema7);
        setIsLoading(false);
      };

      request();
    }
  }, [workflowPageState.startProcessDialog.data.workflowId]);

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        New Process
        <S.CloseButton onClick={onClose} />
      </S.Title>

      {isLoading && (
        <S.Text>
          Loading... <S.Loading />
        </S.Text>
      )}

      {!isLoading && _isEmpty(inputSchema) && (
        <EmptyInputSchema onConfirm={onConfirm} />
      )}

      {!isLoading && !_isEmpty(inputSchema) && (
        <InputSchemaContent inputSchema={inputSchema} onConfirm={onConfirm} />
      )}
    </S.Wrapper>
  );
};

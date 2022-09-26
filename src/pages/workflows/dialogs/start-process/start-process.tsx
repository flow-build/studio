import { useEffect, useState } from "react";
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

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

const CustomTextarea = (props: any) => {
  return <S.SmiteInput />;
};

const widgets = {
  BaseInput: CustomTextarea,
};

export const StartProcess: React.FC<Props> = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [showElementInputSchema, setShowElementInputSchema] = useState(false);
  const [showElementEditInputSchema, setShowElementEditInputSchema] =
    useState(false);
  const [showElementForm, setShowElementForm] = useState(true);

  const workflowPageState = useSelector(
    (state: RootState) => state.workflowPage
  );

  const [inputSchema, setInputSchema] = useState<JSONSchema7>();
  const [payload, setPayload] = useState<string>();
  const workflowId = workflowPageState.startProcessDialog.data.workflowId;
  const processName = workflowPageState.startProcessDialog.data.processName;

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
    showNotification(processName);

    setIsLoading(true);

    const parsedPayload = JSON.parse(payload ?? "{}");
    const response = await createProcessByName(processName, parsedPayload);

    showNotification(processName);

    navigate(`${workflowId}/processes/${response.process_id}/history`);

    if (onClose) {
      onClose();
    }
  }

  useEffect(() => {
    if (workflowId) {
      const request = async () => {
        const workflow = await listWorkflowById(workflowId);
        const nodeStart = workflow.blueprint_spec.nodes.find((node: any) =>
          _isEqual(node.type, "Start")
        );
        setInputSchema(nodeStart.parameters.input_schema as JSONSchema7);
      };

      request();
    }
  }, [workflowId]);

  function onClick() {
    setShowElementEditInputSchema((prev) => !prev);
    setShowElementForm((prev) => !prev);
  }

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        New Process
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <S.Content>
        {_isEmpty(inputSchema) ? (
          <>
            <S.BoxContent>
              <S.BoxMessage>
                <S.Text>
                  The process does not require any formal input schema
                </S.Text>
              </S.BoxMessage>
              <S.Text>
                Initial Bag - Do you want to provide optional data?
                <S.Editor onChange={(newValue) => setPayload(newValue)} />
              </S.Text>
            </S.BoxContent>
            <S.ActionsContainer>
              <S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
              <S.OkButton onClick={onConfirm}>Start</S.OkButton>
            </S.ActionsContainer>
          </>
        ) : (
          <>
            <S.BoxContent>
              {showElementForm ? (
                <S.FormSchema schema={inputSchema} widgets={widgets} />
              ) : null}

              <S.ContainerEditorInputShema>
                {showElementEditInputSchema ? (
                  <>
                    <S.Text>
                      JSON Editor
                      <S.Editor onChange={(newValue) => setPayload(newValue)} />
                    </S.Text>
                  </>
                ) : null}
              </S.ContainerEditorInputShema>

              <S.ContainerInputShema>
                {showElementInputSchema ? (
                  <>
                    <S.Text>
                      Input Schema
                      <S.Editor readOnly value={inputSchema as JSONSchema7} />
                    </S.Text>
                  </>
                ) : null}
              </S.ContainerInputShema>
            </S.BoxContent>
            <S.ActionsContainer>
              {inputSchema?.additionalProperties === false ? (
                <S.SetManually disabled>Set Manually</S.SetManually>
              ) : (
                <S.SetManually onClick={() => onClick()}>
                  Set Manually
                </S.SetManually>
              )}
              <S.OkButton
                disabled={!isValidJSONString(payload)}
                onClick={onConfirm}
              >
                {isLoading && <S.Loading />}

                {!isLoading && <S.TextOkButton>Start</S.TextOkButton>}
              </S.OkButton>
              <S.SeeSchema
                onClick={() => setShowElementInputSchema((prev: any) => !prev)}
              >
                See Schema
              </S.SeeSchema>
            </S.ActionsContainer>
          </>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

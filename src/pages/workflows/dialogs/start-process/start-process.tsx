import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";
import _forIn from "lodash/forIn";

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
  const handleChange = (e: any) => {
    props.onChange(e.target.value); // this is the Form's onChange prop
  };

  return <S.SmiteInput onChange={handleChange} value={props.value} label={`${props.label}`}/>;
};

const widgets = {
  TextWidget: CustomTextarea,
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
  const [formPayload, setFormPayload] = useState<any>({});

  const workflowId = workflowPageState.startProcessDialog.data.workflowId;
  const processName = workflowPageState.startProcessDialog.data.processName;

  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = showElementForm
    ? isFormFilled()
    : !isValidJSONString(payload);

  function isFormFilled() {
    const requireds = inputSchema?.required;

    if (!requireds) {
      return false;
    }

    return requireds?.some((required) => _isEmpty(formPayload[required]));
  }

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

    const parsedPayload = payload ? JSON.parse(payload) : formPayload;
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

  useEffect(() => {
    const form: { [key: string]: string } = {};

    _forIn(inputSchema?.properties, (_, key: string) => (form[key] = ""));

    setFormPayload(form);
  }, [inputSchema]);

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

      {_isEmpty(inputSchema) && (
        <S.Content>
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
        </S.Content>
      )}

      {!_isEmpty(inputSchema) && (
        <S.Content>
          <S.BoxContent>
            {showElementForm && (
              <S.FormSchema
                onChange={(evt) => {
                  if (!_isEmpty(evt.formData)) {
                    setFormPayload((prev: any) => ({
                      ...prev,
                      ...(evt?.formData ?? {}),
                    }));
                  }
                }}
                schema={inputSchema}
                widgets={widgets}
              />
            )}

            {showElementEditInputSchema && (
              <S.ContainerEditorInputShema>
                <S.Text>JSON Editor</S.Text>
                <S.Editor onChange={(newValue) => setPayload(newValue)} />
              </S.ContainerEditorInputShema>
            )}

            {showElementInputSchema && (
              <S.ContainerInputShema>
                <S.Text>Input Schema</S.Text>
                <S.Editor readOnly value={inputSchema as JSONSchema7} />
              </S.ContainerInputShema>
            )}
          </S.BoxContent>

          <S.ActionsContainer>
            {inputSchema?.additionalProperties === false ? (
              <S.SetManually disabled>Set Manually</S.SetManually>
            ) : (
              <S.SetManually onClick={() => onClick()}>
                Set Manually
              </S.SetManually>
            )}

            <S.OkButton disabled={isDisabled} onClick={onConfirm}>
              {isLoading && <S.Loading />}

              {!isLoading && <S.TextOkButton>Iniciar</S.TextOkButton>}
            </S.OkButton>

            <S.SeeSchema
              onClick={() => setShowElementInputSchema((prev: any) => !prev)}
            >
              See Schema
            </S.SeeSchema>
          </S.ActionsContainer>
        </S.Content>
      )}
    </S.Wrapper>
  );
};

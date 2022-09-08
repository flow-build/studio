import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";

import { createProcessByName } from "services/resources/processes/create-by-name";
import { listWorkflowById } from "services/resources/workflows/list-by-id";

import { RootState } from "store";

// import Form from "@rjsf/material-ui";

// import validator from "@rjsf/validator-ajv6";
import { JSONSchema7 } from "json-schema";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

const CustomCheckbox = function (props: any) {
  return (
    <S.TesteHuehue id="custom" onClick={() => props.onChange(!props.value)}>
      {String(props.value)}
    </S.TesteHuehue>
  );
};

const CustomTextarea = (props: any) => {
  return <S.SmiteInput label="huehue" />;
};

const widgets = {
  CheckboxWidget: CustomCheckbox,
  BaseInput: CustomTextarea,
};

export const StartProcess: React.FC<Props> = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const workflowPageState = useSelector(
    (state: RootState) => state.workflowPage
  );

  const [inputSchema, setInputSchema] = useState<JSONSchema7>();
  const [payload, setPayload] = useState<string>();

  function showNotification(message: string) {
    enqueueSnackbar(`Processo ${message} criado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function onConfirm() {
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
      };

      request();
    }
  }, [workflowPageState.startProcessDialog.data.workflowId]);

  console.log("dados do input shema", inputSchema);
  // console.log("payload");

  // formulário do react json schema
  // const schema = inputSchema;
  // const schema = {
  //   title: "Todo",
  //   type: "object",
  //   required: ["title"],
  //   properties: {
  //     title: { type: "string", title: "Title", default: "A new task" },
  //     // done: { type: "boolean", title: "Done?", default: false },
  //   },
  // };

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        New Process
        <S.CloseButton onClick={onClose} />
      </S.Title>

      {!_isEmpty(inputSchema) && (
        <S.Content>
          {/* {!inputSchema ? (
          <S.BoxMessage>
            <S.Text>
              The process does not require any formal input schema
            </S.Text>
          </S.BoxMessage>
        ) : ( */}
          <S.Text>
            Input Schema
            <S.Editor readOnly value={inputSchema as JSONSchema7} />
          </S.Text>
          {/* )} */}
          {/* <S.Text>
          Initial Bag
          <S.Editor onChange={(newValue) => setPayload(newValue)} />
        </S.Text> */}

          <S.FormSchema
            schema={inputSchema}
            // validator={validator}
            widgets={widgets}
          />
        </S.Content>
      )}

      {/* <S.ActionsContainer>
        <S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
        <S.OkButton onClick={onConfirm}>Start</S.OkButton>
      </S.ActionsContainer> */}
    </S.Wrapper>
  );
};

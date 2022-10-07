import { useState } from "react";

import { JSONSchema7 } from "json-schema";

import * as S from "./styles";

type Props = {
  inputSchema: JSONSchema7;
  onConfirm: (payload: string) => void;
};

const CustomTextarea = () => {
  return <S.SmiteInput />;
};

const widgets = {
  BaseInput: CustomTextarea,
};

export const InputSchemaContent: React.FC<Props> = ({
  inputSchema,
  onConfirm,
}) => {
  const [showElementInputSchema, setShowElementInputSchema] = useState(false);
  const [showElementEditInputSchema, setShowElementEditInputSchema] =
    useState(false);
  const [showElementForm, setShowElementForm] = useState(true);

  const [payload, setPayload] = useState<string>();

  function onSubmit() {
    if (payload) {
      onConfirm(payload);
    }
  }

  function onClick() {
    setShowElementEditInputSchema((prev) => !prev);
    setShowElementForm((prev) => !prev);
  }

  return (
    <>
      <S.Content>
        <S.BoxContent>
          {showElementForm ? (
            <S.FormSchema schema={inputSchema} widgets={widgets} />
          ) : null}

          <S.ContainerEditorInputShema>
            {showElementEditInputSchema ? (
              <S.Text>
                JSON Editor
                <S.Editor onChange={(newValue) => setPayload(newValue)} />
              </S.Text>
            ) : null}
          </S.ContainerEditorInputShema>

          <S.ContainerInputShema>
            {showElementInputSchema ? (
              <S.Text>
                Input Schema
                <S.Editor readOnly value={inputSchema} />
              </S.Text>
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
          <S.OkButton onClick={onSubmit}>Start</S.OkButton>
          <S.SeeSchema
            onClick={() => setShowElementInputSchema((prev: any) => !prev)}
          >
            See Schema
          </S.SeeSchema>
        </S.ActionsContainer>
      </S.Content>
    </>
  );
};

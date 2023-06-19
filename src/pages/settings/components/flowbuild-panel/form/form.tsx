import { useState } from "react";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import { IPayloadForm } from "pages/settings/types/IPayloadForm";

import * as S from "./styles";

type Props = {
  input: {
    url: { label: string; defaultValue?: string };
    port: { label: string; defaultValue?: string };
  };
  onChange?: (payload: IPayloadForm) => void;
  onSubmit?: (payload: IPayloadForm) => Promise<void>;
};

export const Form: React.FC<Props> = ({ input, onChange, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<IPayloadForm>({
    url: input.url.defaultValue || "",
    port: input.port.defaultValue || "",
  });

  const isSubmitEnabled = isFormFilled() && !isDefaultValue();

  function isFormFilled() {
    return !_isEmpty(payload.url) && !_isEmpty(payload.port);
  }

  function isDefaultValue() {
    return (
      _isEqual(payload.url, input.url.defaultValue) &&
      _isEqual(payload.port, input.port.defaultValue)
    );
  }

  function onChangePayload(value: string, field: keyof IPayloadForm) {
    const newPayload = { ...payload, [field]: value };

    if (onChange) {
      onChange(newPayload);
    }

    setPayload(newPayload);
  }

  async function onSubmitClick() {
    try {
      if (onSubmit && !loading) {
        setLoading(true);

        await onSubmit(payload);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <S.Wrapper>
      <S.Row>
        <S.Input
          label={input.url.label}
          value={payload.url}
          onChange={(event) => onChangePayload(event.target.value, "url")}
        />

        <S.Input
          small
          label={input.port.label}
          value={payload.port}
          onChange={(event) => onChangePayload(event.target.value, "port")}
        />
      </S.Row>

      <S.Row>
        <S.SubmitButton
          variant="contained"
          disabled={!isSubmitEnabled}
          onClick={onSubmitClick}
        >
          {loading && <S.Loading />}

          {!loading && <S.TextSubmitButton>Salvar</S.TextSubmitButton>}
        </S.SubmitButton>
      </S.Row>
    </S.Wrapper>
  );
};

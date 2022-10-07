import { useState } from "react";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import { IPayloadForm } from "pages/settings/types/IPayloadForm";

import * as S from "./styles";

type Props = {
  labelUrl: string;
  labelPort: string;
  onSubmit: (payload: IPayloadForm) => void;
  isLoading: boolean;
  valueUrl?: string;
  valuePort?: string;
};

export const Form: React.FC<Props> = ({
  labelUrl,
  labelPort,
  onSubmit,
  isLoading,
  valueUrl,
  valuePort,
}) => {
  const [payload, setPayload] = useState<IPayloadForm>({
    url: valueUrl || "",
    port: valuePort || "",
  });

  const isSubmitEnabled = isFormFilled() && !isDefaultValue();

  function isFormFilled() {
    return !_isEmpty(payload.url) && !_isEmpty(payload.port);
  }

  function isDefaultValue() {
    return _isEqual(payload.url, valueUrl) && _isEqual(payload.port, valuePort);
  }

  function onChangePayload(value: string, field: keyof IPayloadForm) {
    setPayload((state) => ({ ...state, [field]: value }));
  }

  return (
    <S.Wrapper>
      <S.Input
        label={labelUrl}
        value={payload.url}
        onChange={(event) => onChangePayload(event.target.value, "url")}
      />

      <S.Input
        small
        label={labelPort}
        value={payload.port}
        onChange={(event) => onChangePayload(event.target.value, "port")}
      />

      <S.SubmitButton
        disabled={!isSubmitEnabled}
        onClick={() => onSubmit(payload)}
      >
        {isLoading && <S.Loading />}

        {!isLoading && <S.TextSubmitButton>Enviar</S.TextSubmitButton>}
      </S.SubmitButton>
    </S.Wrapper>
  );
};

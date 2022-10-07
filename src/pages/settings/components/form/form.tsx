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
  defaultUrl?: string;
  defaultPort?: string;
};

export const Form: React.FC<Props> = ({
  labelUrl,
  labelPort,
  onSubmit,
  isLoading,
  defaultUrl,
  defaultPort,
}) => {
  const [payload, setPayload] = useState<IPayloadForm>({
    url: defaultUrl || "",
    port: defaultPort || "",
  });

  const isSubmitEnabled = isFormFilled() && !isDefaultValue();

  function isFormFilled() {
    return !_isEmpty(payload.url) && !_isEmpty(payload.port);
  }

  function isDefaultValue() {
    return (
      _isEqual(payload.url, defaultUrl) && _isEqual(payload.port, defaultPort)
    );
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

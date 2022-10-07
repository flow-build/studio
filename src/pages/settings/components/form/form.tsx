import { IPayloadForm } from "pages/settings/types/IPayloadForm";
import { useEffect, useState } from "react";

import * as S from "./styles";

type Props = {
  labelUrl?: string;
  labelPort?: string;
  onSubmit: (payload: IPayloadForm) => void;
  isLoading: boolean;
  setSetting?: (payload?: IPayloadForm) => void;
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

  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (
      !payload.url ||
      !payload.port ||
      (payload.url === valueUrl && payload.port === valuePort)
    ) {
      setIsEnabled(false);
    } else {
      setIsEnabled(true);
    }
  }, [payload, valuePort, valueUrl]);

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

      <S.SubmitButton disabled={!isEnabled} onClick={() => onSubmit(payload)}>
        {isLoading && <S.Loading />}
        {!isLoading && <S.TextSubmitButton>Enviar</S.TextSubmitButton>}
      </S.SubmitButton>
    </S.Wrapper>
  );
};

import { useEffect, useState } from "react";

import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";

import { IPayloadForm } from "pages/settings/types/IPayloadForm";

import { healthcheck } from "services/resources/settings";

import * as S from "./styles";

interface IStatusConnection {
  success: boolean;
  message: string;
}

type Props = {
  labelUrl?: string | undefined;
  labelPort?: string | undefined;
  setSetting?: (payload?: IPayloadForm) => void;
  valueUrl?: string;
  valuePort?: string;
};

export const Form: React.FC<Props> = ({
  labelUrl,
  labelPort,
  setSetting,
  valueUrl,
  valuePort,
}) => {
  const [payload, setPayload] = useState<IPayloadForm>({
    url: valueUrl || "",
    port: valuePort || "",
  });
  const [statusConnection, setStatusConnection] = useState<IStatusConnection>();

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

  async function onSubmit() {
    try {
      await healthcheck(payload.url, payload.port);
      setStatusConnection({ success: true, message: "Sucesso ao conectar" });

      if (setSetting) {
        setSetting(payload);
      }
    } catch (error: any) {
      setStatusConnection({ success: false, message: "Erro ao conectar" });

      if (setSetting) {
        setSetting();
      }
    }
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

      <S.Button
        title="Enviar"
        disabled={!isEnabled}
        onClick={() => onSubmit()}
      />

      {!_isUndefined(statusConnection) && (
        <S.StatusConnection
          success={Boolean(statusConnection?.success)}
          message={statusConnection?.message ?? ""}
        />
      )}
    </S.Wrapper>
  );
};

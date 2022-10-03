import { useState } from "react";

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
  labelUrl: string | undefined;
  labelPort: string | undefined;
  setSetting?: (payload?: IPayloadForm) => void;
  valueUrl?: string;
  // valuePort?: string;
  value?: string | undefined;
};

export const Form: React.FC<Props> = ({ labelUrl, labelPort, setSetting }) => {
  const [payload, setPayload] = useState<IPayloadForm>({ url: "", port: "" });
  const [statusConnection, setStatusConnection] = useState<IStatusConnection>();

  const isDisabled = _isEmpty(payload.url) || _isEmpty(payload.port);

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

  // TESTE das portas e url logado

  // const urlServe = process.env.REACT_APP_URL_BASE;
  // console.log("urlServe", urlServe);

  // const portServer = process.env.REACT_APP_URL_PORT;
  // console.log("portServer", portServer);

  function setUrl() {
    const urlServe = process.env.REACT_APP_URL_BASE;
  }

  // const [teste, setTest] = useState({
  //   urlBase: urlServe,
  //   portBase: portServer,
  // });
  // TESTE das portas e url logado

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

      <S.Button title="Enviar" disabled={isDisabled} onClick={onSubmit} />

      {!_isUndefined(statusConnection) && (
        <S.StatusConnection
          success={Boolean(statusConnection?.success)}
          message={statusConnection?.message ?? ""}
        />
      )}
    </S.Wrapper>
  );
};

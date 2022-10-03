import { useState } from "react";

import _isEmpty from "lodash/isEmpty";
import { IPayloadForm } from "pages/settings/types/IPayloadForm";
import { setStorageItem } from "shared/utils/storage";
import { setBaseUrl } from "services/api";
import { getAnonymousToken } from "services/resources/token";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as S from "./styles";

export const Settings: React.FC = () => {
  const [server, setServer] = useState<IPayloadForm>();
  const [mqtt, setMqtt] = useState<IPayloadForm>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const isDisabled = _isEmpty(server);

  // TESTE das portas e url logado

  // const urlServe = process.env.REACT_APP_URL_BASE;
  // console.log("urlServe", urlServe);

  // const portServer = process.env.REACT_APP_URL_PORT;
  // console.log("portServer", portServer);

  // const [teste, setTest] = useState({
  //   urlBase: urlServe,
  //   portBase: portServer,
  // });
  // TESTE das portas e url logado

  // function setServerSetting(urlServer?: IPayloadForm) {
  //   const urlServe = process.env.REACT_APP_URL_BASE;
  //   setServer(urlServe);
  // }

  function setServerSetting(payload?: IPayloadForm) {
    setServer(payload);
  }

  function setMqttSetting(payload?: IPayloadForm) {
    setMqtt(payload);
  }

  async function onSubmit() {
    if (server && mqtt) {
      setStorageItem("SERVER_URL", `${server.url}:${server?.port}`);
      setStorageItem("MQTT_URL", `${mqtt.url}:${mqtt?.port}`);
      setBaseUrl(`${server.url}:${server?.port}`);

      const token = await getAnonymousToken();
      if (token) {
        setStorageItem("TOKEN", token);
        navigate("/dashboard/workflows");
      } else {
        const message = "Erro no retorno do Token. Por favor tentar novamente!";
        enqueueSnackbar(message, {
          autoHideDuration: 4000,
          variant: "error",
        });
      }
    }
  }

  return (
    <S.Wrapper>
      <S.Title>Configurações</S.Title>

      {/* <S.Form
        labelPort="Porta do servidor"
        labelUrl="URL do servidor do flowbuild"
        setSetting={setServerSetting}
      /> */}

      <S.Form
        // labelUrl={urlServe}
        // labelPort={portServer}
        labelPort="Porta do servidor"
        labelUrl="URL do servidor do flowbuild"
        // valueUrl={urlServe}
        // valuePort={portServer}
        setSetting={setServerSetting}
      />

      <S.Form
        labelPort="Porta do MQTT"
        labelUrl="URL do servidor de MQTT"
        setSetting={setMqttSetting}
      />

      <S.Button title="Salvar" onClick={onSubmit} disabled={isDisabled} />
    </S.Wrapper>
  );
};

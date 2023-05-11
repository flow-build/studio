import { IPayloadForm } from "pages/settings/types/IPayloadForm";

import { LocalStorage } from "shared/utils/base-storage/local-storage";

import { healthcheck } from "services/resources/settings";
import { setBaseUrl } from "services/api";

import * as S from "./styles";
import { useForm } from "pages/settings/hooks/useForm";

export const FlowbuildPanel: React.FC = () => {
  const { onSetToken, showNotification } = useForm();

  const defaultValue = {
    url:
      LocalStorage.getInstance().getValueByKey<string>("SERVER_URL") ??
      process.env.REACT_APP_BASE_URL,
    port:
      LocalStorage.getInstance().getValueByKey<string>("SERVER_PORT") ??
      process.env.REACT_APP_URL_PORT,
  };

  const inputConfig = {
    url: {
      label: "URL do servidor do flowbuild",
      defaultValue: defaultValue.url,
    },
    port: {
      label: "Porta do servidor",
      defaultValue: defaultValue.port,
    },
  };

  async function onSubmitServer(payload: IPayloadForm) {
    let url = payload.url;

    try {
      await healthcheck(url, payload.port);

      LocalStorage.getInstance().setValue("SERVER_URL", url);
      LocalStorage.getInstance().setValue("SERVER_PORT", payload.port);
      setBaseUrl(url);
      await onSetToken();

      const message = "Sucesso ao salvar o servidor";
      showNotification(message, "success");
    } catch (erro: any) {
      showNotification(erro.message, "error");
    }
  }

  return (
    <S.Wrapper>
      <S.Form input={inputConfig} onSubmit={onSubmitServer} />
    </S.Wrapper>
  );
};

import { VariantType, useSnackbar } from "notistack";
import jwtDecode from "jwt-decode";

import { IPayloadForm } from "pages/settings/types/IPayloadForm";

import { LocalStorage } from "shared/utils/base-storage/local-storage";
import { SessionStorage } from "shared/utils/base-storage/session-storage";

import { createToken } from "services/resources/token";
import { healthcheck } from "services/resources/settings";
import { setBaseUrl } from "services/api";

import * as S from "./styles";

export const FlowbuildPanel: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

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

  function showNotification(message: string, variant: VariantType) {
    enqueueSnackbar(message, {
      autoHideDuration: 4000,
      variant,
    });
  }

  function getUserId() {
    const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

    if (!token) {
      return "";
    }

    const decoded = jwtDecode(token);
    SessionStorage.getInstance().setValue("TOKEN", token);
    return decoded;
  }

  async function onHandleToken() {
    const userId = getUserId() as string;
    const token = await createToken(userId);

    if (!token) {
      const message = "Erro no retorno do Token. Por favor tentar novamente!";
      showNotification(message, "error");
      return;
    }

    SessionStorage.getInstance().setValue("TOKEN", token);
  }

  async function onSubmitServer(payload: IPayloadForm) {
    let url = payload.url;

    try {
      await healthcheck(url, payload.port);

      LocalStorage.getInstance().setValue("SERVER_URL", url);
      LocalStorage.getInstance().setValue("SERVER_PORT", payload.port);
      setBaseUrl(url);
      await onHandleToken();

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

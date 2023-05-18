import { IPayloadForm } from "pages/settings/types/IPayloadForm";
import { useForm } from "pages/settings/components/flowbuild-panel/form/hooks/useForm";

import { healthcheck } from "services/resources/settings";
import { setBaseUrl } from "services/api";

import { LocalStorage } from "shared/utils/base-storage/local-storage";

import { useSnackbar } from "shared/hooks/snackbar/useSnackbar";

import * as S from "./styles";
import { useDispatch } from "react-redux";
import { updateMqtt } from "store/slices/settings";

export const FlowbuildPanel: React.FC = () => {
  const { onSetToken } = useForm();
  const snackbar = useSnackbar();
  const dispatch = useDispatch();

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

      dispatch(updateMqtt());
      const message = "Sucesso ao salvar o servidor";
      snackbar.success(message);
    } catch (erro: any) {
      snackbar.error(erro.message);
    }
  }

  return (
    <S.Wrapper>
      <S.Form input={inputConfig} onSubmit={onSubmitServer} />
    </S.Wrapper>
  );
};

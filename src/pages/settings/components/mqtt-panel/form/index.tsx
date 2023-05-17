import { useState } from "react";
import { Switch } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Client } from "paho-mqtt";

import * as S from "./styles";
import { LocalStorage } from "shared/utils/base-storage/local-storage";
import { VariantType, useSnackbar } from "notistack";

type Props = {};

type TPayload = {
  namespace?: string;
  url: string;
  port: string;
  isConnectionSecurity: boolean;
  username?: string;
  password?: string;
};

const initialPayload: TPayload = {
  url: "",
  port: "",
  isConnectionSecurity: false,
};

type TForm = {
  loading: boolean;
  payload: TPayload;
};

export const Form: React.FC<Props> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState<TForm>({
    loading: false,
    payload: initialPayload,
  });

  function showNotification(message: string, variant: VariantType) {
    enqueueSnackbar(message, {
      autoHideDuration: 2000,
      variant,
    });
  }

  function onInputChange(text: string, field: keyof TPayload) {
    setForm((prev) => ({
      ...prev,
      payload: { ...prev.payload, [field]: text },
    }));
  }

  function onSwitchWssProtocol(checked: boolean) {
    const resetValue = checked ? "" : undefined;

    setForm((prev) => ({
      ...prev,
      payload: {
        ...prev.payload,
        isConnectionSecurity: checked,
        username: resetValue,
        password: resetValue,
      },
    }));
  }

  function connectToMqtt(
    url: string,
    port: number,
    options?: {
      username?: string;
      password?: string;
      onSuccess?: () => void;
      onFailure?: () => void;
    }
  ) {
    const id = uuidv4();

    const mqttConfig = {
      host: url,
      port: port,
      clientId: id,
    };

    const client = new Client(
      mqttConfig.host,
      mqttConfig.port,
      mqttConfig.clientId
    );

    const securityOptions: { [key: string]: string | boolean } = {};

    if (options?.username && options?.password) {
      securityOptions.userName = options.username;
      securityOptions.password = options.password;
      securityOptions.useSSL = true;
    }

    return new Promise<void>((resolve, reject) => {
      client.connect({
        ...securityOptions,
        timeout: 2,
        onSuccess: async () => {
          const mqttUrl = `${url}:${port}`;
          LocalStorage.getInstance().setValue("MQTT_URL", mqttUrl);
          LocalStorage.getInstance().setValue("MQTT_PORT", port);

          client.disconnect();

          if (options?.onSuccess) {
            options.onSuccess();
          }

          resolve();
        },
        onFailure: () => {
          if (options?.onFailure) {
            options.onFailure();
          }

          reject("Falha de conexão com MQTT");
        },
      });
    });
  }

  async function onSubmit(payload: TPayload) {
    const connectOptions = {
      username: payload.username,
      password: payload.password,

      onSuccess: () => {
        // await onSetToken();
        showNotification("Sucesso ao conectar com o servidor", "success");
      },

      onFailure: () => showNotification("Falha de conexão com MQTT", "error"),
    };

    await connectToMqtt(payload.url, Number(payload.port), connectOptions);
  }

  return (
    <S.Wrapper>
      <S.GridContainer>
        <S.NamespaceInput
          onChange={(event) => onInputChange(event.target.value, "namespace")}
        />

        <S.UrlInput
          required
          onChange={(event) => onInputChange(event.target.value, "url")}
        />
        <S.PortInput
          required
          onChange={(event) => onInputChange(event.target.value, "port")}
        />

        <S.RadioButton
          onChange={(_, checked) => onSwitchWssProtocol(checked)}
          control={<Switch />}
        />

        {form.payload.isConnectionSecurity && (
          <>
            <S.UsernameInput
              required
              onChange={(event) =>
                onInputChange(event.target.value, "username")
              }
            />
            <S.PasswordInput
              required
              onChange={(event) =>
                onInputChange(event.target.value, "password")
              }
            />
          </>
        )}
      </S.GridContainer>

      <S.Row>
        <S.SubmitButton
          variant="contained"
          // disabled={!form.isValid}
          onClick={() => onSubmit(form.payload)}
        >
          {form.loading && <S.Loading />}

          {!form.loading && <S.TextSubmitButton>Salvar</S.TextSubmitButton>}
        </S.SubmitButton>
      </S.Row>
    </S.Wrapper>
  );
};

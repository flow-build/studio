import { Switch } from "@mui/material";

import { useForm } from "pages/settings/components/mqtt-panel/form/hooks/useForm";
import { TPayload } from "pages/settings/components/mqtt-panel/form/types/TPayload";

import { LocalStorage } from "shared/utils/base-storage/local-storage";

import * as S from "./styles";

type Props = {};

export const Form: React.FC<Props> = () => {
  const initialPayload: TPayload = getInitialPayload();

  const form = useForm({ initialPayload });

  function getInitialPayload(): TPayload {
    const localStorageInstance = LocalStorage.getInstance();

    const localUrl = localStorageInstance.getValueByKey<string>("MQTT_URL");
    const localPort = localStorageInstance.getValueByKey<string>("MQTT_PORT");

    const localUsername =
      localStorageInstance.getValueByKey<string>("MQTT_USERNAME");

    const localPassword =
      localStorageInstance.getValueByKey<string>("MQTT_PASSWORD");

    const envUrl = process.env.REACT_APP_MQTT_HOST ?? "";
    const envPort = process.env.REACT_APP_MQTT_PORT ?? "";
    const envUsername = process.env.REACT_APP_MQTT_USERNAME ?? "";
    const envPassword = process.env.REACT_APP_MQTT_PASSWORD ?? "";

    return {
      url: localUrl ?? envUrl,
      port: localPort ?? envPort,
      username: localUsername ?? envUsername,
      password: localPassword ?? envPassword,
      isConnectionSecurity:
        !!(localUsername ?? envUsername) || !!(localPassword ?? envPassword),
    };
  }

  return (
    <S.Wrapper>
      <S.GridContainer>
        <S.NamespaceInput
          value={form.payload.namespace}
          onChange={(event) =>
            form.onInputChange(event.target.value, "namespace")
          }
        />

        <S.UrlInput
          required
          value={form.payload.url}
          onChange={(event) => form.onInputChange(event.target.value, "url")}
        />
        <S.PortInput
          required
          value={form.payload.port}
          onChange={(event) => form.onInputChange(event.target.value, "port")}
        />

        <S.RadioButton
          defaultChecked={initialPayload.isConnectionSecurity}
          checked={form.payload.isConnectionSecurity}
          onChange={(_, checked) => form.onSwitchSslProtocol(checked)}
          control={<Switch />}
        />

        {form.payload.isConnectionSecurity && (
          <>
            <S.UsernameInput
              required
              value={form.payload.username}
              onChange={(event) =>
                form.onInputChange(event.target.value, "username")
              }
            />
            <S.PasswordInput
              required
              value={form.payload.password}
              onChange={(event) =>
                form.onInputChange(event.target.value, "password")
              }
            />
          </>
        )}
      </S.GridContainer>

      <S.Row>
        <S.SubmitButton
          variant="contained"
          disabled={!form.isValid || !form.hasChange}
          onClick={() => form.onSubmit(form.payload)}
        >
          {form.loading && <S.Loading />}

          {!form.loading && <S.TextSubmitButton>Salvar</S.TextSubmitButton>}
        </S.SubmitButton>
      </S.Row>
    </S.Wrapper>
  );
};

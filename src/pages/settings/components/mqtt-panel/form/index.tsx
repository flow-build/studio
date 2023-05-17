import { Switch } from "@mui/material";

import { useForm } from "pages/settings/components/mqtt-panel/form/hooks/useForm";
import { TPayload } from "pages/settings/components/mqtt-panel/form/types/TPayload";

import * as S from "./styles";

type Props = {};

const initialPayload: TPayload = {
  url: "",
  port: "",
  isConnectionSecurity: false,
};

export const Form: React.FC<Props> = () => {
  const form = useForm({ initialPayload });

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

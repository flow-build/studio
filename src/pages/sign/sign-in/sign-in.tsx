import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import flowbuildLogo from "assets/images/flowbuild-studio/default.svg";

import { getAnonymousToken } from "services/resources/token";

import { setStorageItem } from "shared/utils/storage";

import { useSnackbar } from "notistack";

import * as S from "./styles";
import { getToken } from "services/resources/diagrams/token";

export const SignIn = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const onChangeTextByField = useCallback(
    (text: string, field: "email" | "password") => {
      setPayload((prev) => ({ ...prev, [field]: text }));
    },
    []
  );

  const onLogin = useCallback(async () => {
    const token = await getAnonymousToken();
    const diagramToken = await getToken();

    if (token) {
      setStorageItem("TOKEN", token);
      setStorageItem("TOKEN_DIAGRAM", diagramToken);
      navigate("/dashboard");
    }

    navigate("dashboard/settings");
    const message = "Erro. Insira URL e porta válida para a aplicação";
    enqueueSnackbar(message, {
      autoHideDuration: 4000,
      variant: "error",
    });
  }, [navigate, enqueueSnackbar]);

  return (
    <S.Wrapper>
      <S.LoginContainer>
        <S.LogoContainer>
          <img src={flowbuildLogo} alt="Logo" />
        </S.LogoContainer>

        <S.Form>
          <S.Input
            id="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            type="email"
            value={payload.email}
            onChange={(evt) => onChangeTextByField(evt.target.value, "email")}
          />

          <S.Input
            id="password"
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            value={payload.password}
            onChange={(evt) =>
              onChangeTextByField(evt.target.value, "password")
            }
          />

          <S.PrimaryButton title="Login" fullWidth onClick={onLogin} />
        </S.Form>
      </S.LoginContainer>
    </S.Wrapper>
  );
};

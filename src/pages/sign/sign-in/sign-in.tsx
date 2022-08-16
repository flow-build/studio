import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import flowbuildLogo from "assets/images/flowbuild-studio/default.svg";

import { getAnonymousToken } from "services/resources/token";

import { setStorageItem } from "shared/utils/storage";

import * as S from "./styles";

export const SignIn = () => {
  const navigate = useNavigate();

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

    if (token) {
      setStorageItem("TOKEN", token);
      console.log("token", token);
      navigate("/dashboard");
    }
  }, [navigate]);

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


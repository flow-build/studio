import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Amplify, Auth, Cache } from "aws-amplify";
import amplifyConfig from "amplify-config";

import { AwsError } from "constants/aws-error";
import { EyeIcon } from "pages/auth/components/eye-icon";
import { getAnonymousToken } from "services/resources/token";
import { Logo } from "pages/auth/components/logo";
import { setStorageItem } from "shared/utils/storage";
import { useSnackbar } from "notistack";
import { Version } from "pages/auth/components/version";

import * as S from "./styles";

Amplify.configure(amplifyConfig);

export const SignIn = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    try {
      e.preventDefault();
      const response = await Auth.signIn({
        username: payload.email,
        password: payload.password,
      });
      const token = await getAnonymousToken(response.username);
      setStorageItem("TOKEN", token);
      navigate("/dashboard");
    } catch (error: any) {
      if (error.code === AwsError.USER_NOT_CONFIRMED) {
        navigate("/confirmation-code")
      }
      console.log(error);
      setInputError(true);
      enqueueSnackbar(error.message, {
        autoHideDuration: 2000,
        variant: "error",
      });
    }
  }

  function handleChange(name: string, value: string) {
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
    setInputError(false);
  }

  function saveCredentialsOnLocalStorage() {
    const localStorageCache = Cache.createInstance({
      keyPrefix: "localStorageAuthCache",
      storage: window.localStorage,
    });

    Auth.configure({
      storage: localStorageCache,
    });
  }

  function saveCredentialsOnSessionStorage() {
    const sessionStorageCache = Cache.createInstance({
      keyPrefix: "sessionAuthCache",
      storage: window.sessionStorage,
    });

    Auth.configure({
      storage: sessionStorageCache,
    });
  }

  function changeAuthStorageConfiguration(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const shouldRememberUser = e.target.checked;

    if (shouldRememberUser) {
      return saveCredentialsOnLocalStorage();
    }

    saveCredentialsOnSessionStorage();
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.LoginContainer>
          <Logo />

          <S.Form onSubmit={handleSubmit}>
            <S.Input
              onChange={({ target }) => handleChange(target.name, target.value)}
              error={inputError}
            />

            <S.FormControlIcon>
              <S.Label>Password</S.Label>
              <S.InputPassword
                type={showPassword ? "text" : "password"}
                value={payload.password}
                onChange={({ target }) =>
                  handleChange(target.name, target.value)
                }
                error={inputError}
                endAdornment={
                  <EyeIcon onClick={(evento) => setShowPassword(evento)} />
                }
              />
            </S.FormControlIcon>

            <S.Control
              control={<S.CheckBox onChange={changeAuthStorageConfiguration} />}
            />

            <S.SubmitButton />
          </S.Form>

          <S.ButtonsContainer>
            <S.ForgotPasswordButton
              onClick={() => navigate("/forgot-password")}
            />
            <S.RegisterButton onClick={() => navigate("/sign-up")} />
          </S.ButtonsContainer>
        </S.LoginContainer>
      </S.Container>

      <Version />
    </S.Wrapper>
  );
};
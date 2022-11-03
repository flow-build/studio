import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, Cache } from "aws-amplify";

import { getAnonymousToken } from "services/resources/token";
import { setStorageItem } from "shared/utils/storage";
import { ForgotPassword } from "pages/register/components/sign-in/components/forgot-password";

import * as S from "./styles";
import { InputLabel } from "@mui/material";
import { EyeIcon } from "../eye-icon";

export const SignInForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false,
    signedIn: false,
    isSigningIn: false,
    isSigningOut: false,
    resetPassword: false,
    inputError: false,
    tokenId: "",
    refreshToken: "",
  });

  function handleChange(name: string, value: string) {
    setState((prev) => ({
      ...prev,
      [name]: value,
      inputError: false,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    try {
      e.preventDefault();
      const { signedIn, email, password } = state;

      if (!signedIn) {
        setState((prev) => ({ ...prev, isSigningIn: true }));
        const response = await Auth.signIn({
          username: email,
          password: password,
        });
        const token = await getAnonymousToken(response.username);
        setStorageItem("TOKEN", token);
        navigate("/dashboard");
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isSigningIn: false }));
      console.log(error);
      setState((prev) => ({
        ...prev,
        inputError: true,
      }));
    }
  }

  function changeAuthStorageConfiguration(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const shouldRememberUser = e.target.checked;
    if (shouldRememberUser) {
      const localStorageCache = Cache.createInstance({
        keyPrefix: "localStorageAuthCache",
        storage: window.localStorage,
      });

      Auth.configure({
        storage: localStorageCache,
      });

      return;
    }

    const sessionStorageCache = Cache.createInstance({
      keyPrefix: "sessionAuthCache",
      storage: window.sessionStorage,
    });

    Auth.configure({
      storage: sessionStorageCache,
    });
  }

  if (state.resetPassword) {
    return <ForgotPassword />;
  }

  return (
    <>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          label="E-mail"
          type="text"
          name="email"
          placeholder="Type your e-mail"
          onChange={({ target }) => handleChange(target.name, target.value)}
          error={state.inputError}
        />

        <S.FormControlIcon>
          <InputLabel>Password</InputLabel>
          <S.InputPassword
            label="Password"
            name="password"
            placeholder="Type your password"
            type={state.showPassword ? "text" : "password"}
            value={state.password}
            onChange={({ target }) => handleChange(target.name, target.value)}
            endAdornment={
              <EyeIcon
                onClick={(evento) =>
                  setState((prev) => ({ ...prev, showPassword: evento }))
                }
              />
            }
          />
        </S.FormControlIcon>

        <S.Control
          control={<S.CheckBox onChange={changeAuthStorageConfiguration} />}
        />
        <S.SubmitButton disabled={state.isSigningIn} />
      </S.Form>

      <S.Container>
        <S.ForgotPasswordButton
          onClick={() => setState((prev) => ({ ...prev, resetPassword: true }))}
        />
      </S.Container>
    </>
  );
};

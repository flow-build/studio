import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, Cache } from "aws-amplify";

import { getAnonymousToken } from "services/resources/token";
import { setStorageItem } from "shared/utils/storage";
import { ForgotPassword } from "pages/register/components/sign-in/components/forgot-password";

import * as S from "./styles";

export const SignInForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    signedIn: false,
    isSigningIn: false,
    isSigningOut: false,
    resetPassword: false,
    inputError: false,
    tokenId: "",
    refreshToken: "",
  });

  function handleChange(e: any) {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      inputError: false,
    }));
  }

  async function handleSubmit(e: any) {
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

  function changeAuthStorageConfiguration(e: any) {
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
          onChange={handleChange}
          error={state.inputError}
        />

        <S.Input
          label="Password"
          name="password"
          placeholder="Type your password"
          type="password"
          value={state.password}
          onChange={handleChange}
          error={state.inputError}
        />

        <S.FormControl
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

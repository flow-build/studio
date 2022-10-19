import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, Cache } from "aws-amplify";

import * as S from "./styles";

export const SignInForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    signedIn: false,
    isSigningIn: false,
    isSigningOut: false,
  });

  function handleChange(e: any) {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      const { signedIn, email, password } = state;

      if (!signedIn) {
        setState((prev) => ({ ...prev, isSigningIn: true }));
        await Auth.signIn({
          username: email,
          password: password,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isSigningIn: false }));
      console.log(error);
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

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Input
        label="E-mail"
        type="text"
        name="email"
        placeholder="Type your e-mail"
        onChange={handleChange}
      />

      <S.Input
        label="Password"
        name="password"
        placeholder="Type your password"
        type="password"
        value={state.password}
        onChange={handleChange}
      />

      <S.FormControl
        control={<S.CheckBox onChange={changeAuthStorageConfiguration} />}
      />
      <S.SubmitButton disabled={state.isSigningIn} />
    </S.Form>
  );
};

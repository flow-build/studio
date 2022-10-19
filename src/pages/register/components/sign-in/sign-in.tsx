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

  function handleSubmit(e: any) {
    e.preventDefault();
    const { signedIn, email, password } = state;

    if (!signedIn) {
      setState((prev) => ({ ...prev, isSigningIn: true }));
      Auth.signIn({
        username: email,
        password: password,
      })
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err) => {
          setState((prev) => ({ ...prev, isSigningIn: false }));
          console.log(err);
        });
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
    } else {
      const sessionStorageCache = Cache.createInstance({
        keyPrefix: "sessionAuthCache",
        storage: window.sessionStorage,
      });

      Auth.configure({
        storage: sessionStorageCache,
      });
    }
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
        control={
          <S.CheckBox onChange={changeAuthStorageConfiguration}
        />}
      ></S.FormControl>

      <S.SubmitButton disabled={state.isSigningIn}/>
    </S.Form>
  );
};

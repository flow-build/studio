import React, { useState } from "react";
import { Auth } from "aws-amplify";

import * as S from "./styles";

export const SignUpForm = () => {
  const [state, setState] = useState({
    signedUp: false,
    confirmed: false,
    email: "",
    password: "",
    confirmationCode: "",
    submittingSignUp: false,
    submittingConfirmation: false,
  });

  function handleChange(e: any) {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmitSignUp(e: any) {
    e.preventDefault(e);
    const { confirmed, signedUp, email, password } = state;

    if (!confirmed && !signedUp) {
      setState((prev) => ({ ...prev, submittingSignUp: true }));

      Auth.signUp({
        username: state.email,
        password: state.password,
      })
        .then(() =>
          setState((prev) => ({
            ...prev,
            signedUp: true,
            submittingSignUp: false,
          }))
        )
        .catch((err) => {
          setState((prev) => ({ ...prev, submittingSignUp: false }));
          console.log(err);
        });
    }
  }

  function handleSubmitConfirmationSignUp(e: any) {
    e.preventDefault(e);
    const { confirmed, signedUp, email, confirmationCode } = state;

    if (!confirmed && signedUp) {
      setState((prev) => ({ ...prev, submittingConfirmation: true }));

      Auth.confirmSignUp(email, confirmationCode)
        .then(() =>
          setState((prev) => ({
            ...prev,
            submittingConfirmation: false,
            confirmed: true,
          }))
        )
        .catch((err) => {
          console.log(err);
          setState((prev) => ({ ...prev, submittingConfirmation: false }));
        });
    }
  }
  
  if (state.confirmed) {
    return <div></div>;
  }

  if (state.signedUp) {
    return (
      <S.Form onSubmit={handleSubmitConfirmationSignUp}>
        <S.Input
          label="E-mail"
          type="text"
          name="email"
          placeholder="Type your e-mail"
          onChange={handleChange}
        />

        <S.Input
          label="Confirmation Code"
          type="text"
          name="confirmationCode"
          placeholder="Type your confirmation code"
          onChange={handleChange}
        />

        <S.SubmitButton
          disabled={state.submittingConfirmation}
        >
        </S.SubmitButton>
      </S.Form>
    );
  }

  return (
    <S.Form onSubmit={handleSubmitSignUp}>
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
        type="text"
        value={state.password}
        onChange={handleChange}
      />
      <S.SubmitContainer>
        <S.SubmitButton
          disabled={state.submittingSignUp}
          type="submit"
          className="btn btn-primary"
        >
          Cadastrar
        </S.SubmitButton>
      </S.SubmitContainer>
    </S.Form>
  );
};

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

  async function handleSubmitSignUp(e: any) {
    try {
      e.preventDefault(e);
      const { confirmed, signedUp } = state;

      if (!confirmed && !signedUp) {
        setState((prev) => ({ ...prev, submittingSignUp: true }));

        await Auth.signUp({
          username: state.email,
          password: state.password,
        });

        setState((prev) => ({
          ...prev,
          signedUp: true,
          submittingSignUp: false,
        }));
      }
    } catch (error) {
      setState((prev) => ({ ...prev, submittingSignUp: false }));
      console.log(error);
    }
  }

  async function handleSubmitConfirmationSignUp(e: any) {
    try {
      e.preventDefault(e);
      const { confirmed, signedUp, email, confirmationCode } = state;

      if (!confirmed && signedUp) {
        setState((prev) => ({ ...prev, submittingConfirmation: true }));

        await Auth.confirmSignUp(email, confirmationCode);
        setState((prev) => ({
          ...prev,
          submittingConfirmation: false,
          confirmed: true,
        }));
      }
    } catch (error) {
      setState((prev) => ({ ...prev, submittingConfirmation: false }));
      console.log(error);
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
        ></S.SubmitButton>
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
        <S.SubmitButton disabled={state.submittingSignUp}></S.SubmitButton>
      </S.SubmitContainer>
    </S.Form>
  );
};
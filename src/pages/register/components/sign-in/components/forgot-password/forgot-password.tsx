import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

import * as S from "./styles";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    code: "",
    resetPassword: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    try {
      e.preventDefault();
      const { email } = state;

      await Auth.forgotPassword(email);
      setState((prev) => ({ ...prev, resetPassword: true }));
    } catch (error) {
      setState((prev) => ({ ...prev, resetPassword: false }));
      console.log(error);
    }
  }

  async function handleSubmitConfirmation(e: React.FormEvent<HTMLDivElement> ) {
    try {
      e.preventDefault();
      const { email, password, code } = state;
      await Auth.forgotPasswordSubmit(email, code, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  if (state.resetPassword) {
    return (
      <S.Form onSubmit={handleSubmitConfirmation}>
        <S.Input
          label="Email"
          type="text"
          name="email"
          placeholder="Type your email"
          onChange={handleChange}
        />
        <S.Input
          label="Code"
          type="text"
          name="code"
          placeholder="Type confirmation code"
          onChange={handleChange}
        />
        <S.Input
          label="Password"
          type="text"
          name="password"
          placeholder="Type your new password"
          onChange={handleChange}
        />
        <S.SubmitButton title="Reset Password" />
      </S.Form>
    );
  }

  return (
    <S.Form onSubmit={(evento)=>handleSubmit(evento)}>
      <S.Input
        label="E-mail"
        type="text"
        name="email"
        placeholder="Type your e-mail"
        onChange={handleChange}
      />

      <S.SubmitButton title="get code" />
    </S.Form>
  );
};

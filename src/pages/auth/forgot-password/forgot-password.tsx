import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

import { ResetPassword } from "pages/auth/forgot-password/components/reset-password";

import * as S from "./styles";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [resetPassword, setResetPassword] = useState(false);

  const [inputError, setInputError] = useState(false);

  async function handleSubmit() {
    try {
      const { email } = payload;

      await Auth.forgotPassword(email);
      setResetPassword(true);
    } catch (error) {
      setInputError(true);
      setResetPassword(false);
      console.log(error);
    }
  }

  function handleChange(name: string, value: string) {
    setPayload((prev) => ({ ...prev, [name]: value }));
    setInputError(false);
  }

  function onSubmit(event: React.FormEvent<HTMLDivElement>) {
    event.preventDefault();

    if (resetPassword) {
      return;
    }

    handleSubmit();
  }

  return (
    <S.Wrapper onSubmit={onSubmit}>
      {resetPassword && <ResetPassword />}

      {!resetPassword && (
        <>
          <S.Input
            onChange={({ target }) => handleChange(target.name, target.value)}
            error={inputError}
          />
          <S.SubmitContainer>
            <S.BackButton onClick={() => navigate("/")} />
            <S.SubmitButton title="get code" />
          </S.SubmitContainer>
        </>
      )}
    </S.Wrapper>
  );
};

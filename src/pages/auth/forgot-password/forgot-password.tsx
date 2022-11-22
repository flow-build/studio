import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

import { Logo } from "pages/auth/components/logo";
import { ResetPassword } from "pages/auth/forgot-password/components/reset-password";
import { Version } from "pages/auth/components/version";

import * as S from "./styles";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [resetPassword, setResetPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    try {
      e.preventDefault();
      const { email } = payload;

      await Auth.forgotPassword(email);
      setResetPassword(true);
    } catch (error) {
      setResetPassword(false);
      console.log(error);
    }
  }

  function handleChange(name: string, value: string) {
    setPayload((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.LoginContainer>
          <Logo />

          {resetPassword && <ResetPassword />}
          {!resetPassword && (
            <S.Form onSubmit={handleSubmit}>
              <S.Input
                onChange={({ target }) =>
                  handleChange(target.name, target.value)
                }
              />
              <S.SubmitContainer>
                <S.BackButton onClick={() => navigate("/")} />
                <S.SubmitButton title="get code" />
              </S.SubmitContainer>
            </S.Form>
          )}
        </S.LoginContainer>
      </S.Container>
      <Version />
    </S.Wrapper>
  );
};

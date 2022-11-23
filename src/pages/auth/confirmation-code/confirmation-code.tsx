import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

import _isEmpty from "lodash/isEmpty";

import { Logo } from "pages/auth/components/logo";
import { useSnackbar } from "notistack";
import { Version } from "pages/auth/components/version";

import * as S from "./styles";

export const ConfirmationCode = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [payload, setPayload] = useState({
    email: "",
    confirmationCode: "",
  });

  const [inputError, setInputError] = useState(false);

  const disabled = _isEmpty(payload.email && payload.confirmationCode);

  async function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    try {
      e.preventDefault();
      await Auth.confirmSignUp(payload.email, payload.confirmationCode);
      navigate("/dashboard");
    } catch (error: any) {
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

  return (
    <S.Wrapper>
      <S.Container>
        <S.LoginContainer>
          <Logo />
          <S.Form onSubmit={handleSubmit}>
            <S.Input
              label="E-mail"
              type="text"
              name="email"
              placeholder="Type your e-mail"
              onChange={({ target }) => handleChange(target.name, target.value)}
              error={inputError}
            />
            <S.Input
              label="Confirmation Code"
              type="text"
              name="confirmationCode"
              placeholder="Type your confirmation code"
              onChange={({ target }) => handleChange(target.name, target.value)}
              error={inputError}
            />
            <S.SubmitContainer>
              <S.SubmitButton title={"Submit"} disabled={disabled} />
              <S.ResendCodeButton
                title={"Resend code"}
                onClick={() => Auth.resendSignUp(payload.email)}
              />
            </S.SubmitContainer>
          </S.Form>
        </S.LoginContainer>
      </S.Container>
      <Version />
    </S.Wrapper>
  );
};

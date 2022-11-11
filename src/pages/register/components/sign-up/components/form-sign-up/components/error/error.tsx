import { useState } from "react";

import { ForgotPassword } from "pages/register/components/sign-in/components/forgot-password";

import * as S from "./styles";

export const Error = () => {
  const [forgottenPassword, setForgottenPassword] = useState(false);

  function handleBackButton() {
    setForgottenPassword(false);
  }
  if (forgottenPassword) {
    return <ForgotPassword handleBackButton={handleBackButton} />;
  }
  return (
    <S.ErrorContainer>
      <S.Text> This email is already being used </S.Text>
      <S.OptionsContainer>
        <S.ForgotPasswordButton
          onClick={() => {
            console.log("clicou");
            setForgottenPassword(true);
          }}
        />
      </S.OptionsContainer>
    </S.ErrorContainer>
  );
};

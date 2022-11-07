import { useState } from "react";
import { Auth } from "aws-amplify";

import { FormEmail } from "pages/register/components/sign-up/components/form-sign-up/components/form-email";
import { FormPassword } from "pages/register/components/sign-up/components/form-sign-up/components/form-password";

import * as S from "./styles";

type Props = {
  handleFormSignUp: () => void;
};

export const FormSignUp: React.FC<Props> = ({ handleFormSignUp }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    signedUp: false,
    emailStatus: false,
    passwordStatus: false,
  });

  async function handleSubmitSignUp(e: React.FormEvent<HTMLDivElement>) {
    // try {
    //   e.preventDefault();
    //   if (!state.signedUp) {
    //     await Auth.signUp({
    //       username: state.email,
    //       password: state.password,
    //     });
    //     handleFormSignUp();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  function handleFormEmail(email: string) {
    setState((prev) => ({ ...prev, emailStatus: true, email: email }));
  }

  function handleCodeIsMissingError(){
    handleFormSignUp();
  }

  function handleFormPassword(password: string) {
    setState((prev) => ({ ...prev, passwordStatus: true, password: password }));
  }

  function handleBackButton() {
    setState((prev) => ({ ...prev, emailStatus: false }));
  }

  return (
    <S.Form onSubmit={handleSubmitSignUp}>
      {!state.emailStatus && (
        <FormEmail onClick={(email) => handleFormEmail(email)} />
      )}
      {state.emailStatus && (
        <>
          <FormPassword
            onClick={(password) => handleFormPassword(password)}
            handleBackButton={handleBackButton}
          />
        </>
      )}
    </S.Form>
  );
};

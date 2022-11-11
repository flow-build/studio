import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

import _isEmpty from "lodash/isEmpty";

import * as S from "./styles";

type Props = { signedUp: boolean };

export const FormConfirmationCode: React.FC<Props> = ({ signedUp }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    confirmed: false,
    confirmationCode: "",
    email: "",
  });

  const disabled = _isEmpty(state.email && state.confirmationCode)

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmitConfirmationSignUp(
    e: React.FormEvent<HTMLDivElement>
  ) {
    try {
      e.preventDefault();
      const { confirmed, email, confirmationCode } = state;

      if (!confirmed && signedUp) {
        setState((prev) => ({ ...prev, submittingConfirmation: true }));

        await Auth.confirmSignUp(email, confirmationCode);
        setState((prev) => ({
          ...prev,
          submittingConfirmation: false,
          confirmed: true,
        }));
        navigate("./dashboard");
      }
    } catch (error) {
      setState((prev) => ({ ...prev, submittingConfirmation: false }));
      console.log(error);
    }
  }

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
      <S.SubmitContainer>
        <S.SubmitButton title={"Submit"} disabled={disabled}/>
        <S.ResendCodeButton
          title={"Resend code"}
          onClick={() => Auth.resendSignUp(state.email)}
        />
      </S.SubmitContainer>
    </S.Form>
  );
};

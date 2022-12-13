import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Auth } from "aws-amplify";

import * as S from "./styles";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    code: "",
  });

  const [inputError, setInputError] = useState(false);

  function handleChange(name: string, value: string) {
    setPayload((prev) => ({ ...prev, [name]: value }));
    setInputError(false);
  }

  async function handleSubmit() {
    try {
      const { email, password, code } = payload;
      await Auth.forgotPasswordSubmit(email, code, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setInputError(true);
    }
  }

  return (
    <>
      <S.Input
        label="Email"
        type="text"
        name="email"
        placeholder="Type your email"
        onChange={({ target }) => handleChange(target.name, target.value)}
        error={inputError}
      />
      <S.Input
        label="Code"
        type="text"
        name="code"
        placeholder="Type confirmation code"
        onChange={({ target }) => handleChange(target.name, target.value)}
        error={inputError}
      />
      <S.Input
        label="Password"
        type="text"
        name="password"
        placeholder="Type your new password"
        onChange={({ target }) => handleChange(target.name, target.value)}
        error={inputError}
      />
      <S.SubmitContainer>
        <S.BackButton onClick={() => navigate("/")} />
        <S.ResendCodeButton onClick={() => Auth.resendSignUp(payload.email)} />
      </S.SubmitContainer>
      
      <S.SubmitButton title="Reset Password" onClick={handleSubmit} />
    </>
  );
};

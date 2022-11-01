import { useState } from "react";

import * as S from "./styles";

type Props = {
  onClick: (password: string) => void;
  handleBackButton: () => void;
};

export const FormPassword: React.FC<Props> = ({
  onClick,
  handleBackButton,
}) => {
  const [payload, setPayload] = useState({
    password: "",
    confirmPassword: "",
    hasNumber: false,
    hasUppercase: false,
    hasSpecialCharacters: false,
    hasMinimumCharacters: false,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setPayload((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleDisable() {
    if (
      payload.hasSpecialCharacters &&
      payload.hasUppercase &&
      payload.hasNumber &&
      payload.hasMinimumCharacters
    ) {
      return false;
    }
    return true;
  }

  function handlePassword(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const isSpecialCharacters = new RegExp("[@!#$%^&*()/]").test(
      payload.password
    );
    const isUppercase = new RegExp("[A-Z]").test(payload.password);
    const isNumber = new RegExp("[0-9]").test(payload.password);
    const haveMinimumCharacters = new RegExp(".{7,20}").test(payload.password);

    console.log("Special Character:", isSpecialCharacters);
    console.log("Uppercase:", isUppercase);
    console.log("Number:", isNumber);
    console.log("Have 8 letters:", haveMinimumCharacters);

    setPayload((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      hasSpecialCharacters: isSpecialCharacters,
      hasUppercase: isUppercase,
      hasNumber: isNumber,
      hasMinimumCharacters: haveMinimumCharacters,
    }));
  }

  return (
    <>
      {/* <S.BackButton onClick={handleBackButton}></S.BackButton> */}
      <S.Input
        label="Password"
        name="password"
        placeholder="Type your password"
        type="password"
        value={payload.password}
        onChange={handlePassword}
      />

      <S.Input
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm your password"
        type="password"
        value={payload.confirmPassword}
        onChange={handleChange}
      />
      <S.PasswordContainer>
        <S.PasswordItens isDisabled={payload.hasMinimumCharacters}>
          <S.Text>at least 8 characters</S.Text>
        </S.PasswordItens>
        <S.PasswordItens isDisabled={payload.hasUppercase}>
          <S.Text> uppercase letter</S.Text>
        </S.PasswordItens>
        <S.PasswordItens isDisabled={payload.hasNumber}>
          <S.Text>number</S.Text>
        </S.PasswordItens>
        <S.PasswordItens isDisabled={payload.hasSpecialCharacters}>
          <S.Text> especial character</S.Text>
        </S.PasswordItens>
      </S.PasswordContainer>

      <S.SubmitContainer>
        <S.BackButton onClick={handleBackButton}></S.BackButton>{" "}
        <S.SubmitButton
          disabled={handleDisable()}
          onClick={() => onClick(payload.password)}
        ></S.SubmitButton>
      </S.SubmitContainer>
    </>
  );
};

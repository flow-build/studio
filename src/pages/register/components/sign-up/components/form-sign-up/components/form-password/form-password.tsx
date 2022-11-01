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

  function handleClickShowPassword() {
    setPayload((prev) => ({
      ...prev,
      showPassword: !payload.showPassword,
    }));
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <>
    <InputLabel>Password</InputLabel>
      <S.Input
        label="Password"
        name="password"
        placeholder="Type your password"
        type={payload.showPassword ? "text" : "password"}
        value={payload.password}
        onChange={({ target }) => handlePassword(target.name, target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              onMouseDown={handleMouseDownPassword}
            >
              {payload.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
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

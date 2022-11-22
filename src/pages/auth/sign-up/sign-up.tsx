import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

import _isEqual from "lodash/isEqual";

import { EyeIcon } from "pages/auth/components/eye-icon";
import { Logo } from "pages/auth/components/logo";
import { Version } from "pages/auth/components/version";

import * as S from "./styles";

export const SignUp = () => {
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordAttributes, setPasswordAttributes] = useState({
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialCharacters: false,
    hasMinimumCharacters: false,
  });

  const [showSecurityText, setShowSecurityText] = useState({
    password: false,
    confirmPassword: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    try {
      e.preventDefault();
      await Auth.signUp({
        username: payload.email,
        password: payload.password,
      });
      navigate("confirm-password")
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(name: string, value: string) {
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function getIsDisabled() {
    const isEqual = _isEqual(payload.password, payload.confirmPassword);
    const {
      hasSpecialCharacters,
      hasUppercase,
      hasNumber,
      hasMinimumCharacters,
    } = passwordAttributes;

    return (
      !hasSpecialCharacters ||
      !hasUppercase ||
      !hasNumber ||
      !hasMinimumCharacters ||
      !isEqual
    );
  }

  function handlePassword(name: string, value: string) {
    const password = value;
    const isSpecialCharacters = new RegExp("[@!#$%^&*()/]").test(password);
    const isUppercase = new RegExp("[A-Z]").test(password);
    const isLowercase = new RegExp("[a-z]").test(password);
    const isNumber = new RegExp("[0-9]").test(password);
    const haveMinimumCharacters = new RegExp("^.{8,256}$").test(password);

    setPayload((prev) => ({ ...prev, [name]: value }));

    setPasswordAttributes((prev) => ({
      ...prev,
      hasSpecialCharacters: isSpecialCharacters,
      hasUppercase: isUppercase,
      hasLowercase: isLowercase,
      hasNumber: isNumber,
      hasMinimumCharacters: haveMinimumCharacters,
    }));
  }

  function handleSecurityText(name: string, evento: boolean) {
    setShowSecurityText((prev) => ({ ...prev, [name]: evento }));
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.LoginContainer>
          <Logo />
          <S.Form onSubmit={handleSubmit}>
            <S.Input
              value={payload.email}
              onChange={({ target }) => handleChange(target.name, target.value)}
            />
            <S.FormControlIcon>
              <S.Label>Password</S.Label>
              <S.InputPassword
                label="Password"
                name="password"
                placeholder="Type your password"
                type={showSecurityText.password ? "text" : "password"}
                value={payload.password}
                onChange={({ target }) =>
                  handlePassword(target.name, target.value)
                }
                endAdornment={
                  <EyeIcon
                    onClick={(evento) => handleSecurityText("password", evento)}
                  />
                }
              />
            </S.FormControlIcon>

            <S.FormControlIcon>
              <S.Label>Confirm Password</S.Label>
              <S.InputPassword
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={showSecurityText.confirmPassword ? "text" : "password"}
                value={payload.confirmPassword}
                onChange={({ target }) =>
                  handleChange(target.name, target.value)
                }
                endAdornment={
                  <EyeIcon
                    onClick={(evento) =>
                      handleSecurityText("confirmPassword", evento)
                    }
                  />
                }
              />
            </S.FormControlIcon>

            <S.PasswordContainer>
              <S.PasswordItens
                isDisabled={passwordAttributes.hasMinimumCharacters}
              >
                <S.Text> Length between 8 and 256</S.Text>
              </S.PasswordItens>
              <S.PasswordItens isDisabled={passwordAttributes.hasUppercase}>
                <S.Text> Uppercase letter</S.Text>
              </S.PasswordItens>
              <S.PasswordItens isDisabled={passwordAttributes.hasLowercase}>
                <S.Text> Lowercase letter</S.Text>
              </S.PasswordItens>
              <S.PasswordItens isDisabled={passwordAttributes.hasNumber}>
                <S.Text> Has number </S.Text>
              </S.PasswordItens>
              <S.PasswordItens
                isDisabled={passwordAttributes.hasSpecialCharacters}
              >
                <S.Text> Special character</S.Text>
              </S.PasswordItens>
            </S.PasswordContainer>

            <S.SubmitContainer>
              <S.BackButton onClick={() => navigate("/")} />
              <S.SubmitButton disabled={getIsDisabled()} />
            </S.SubmitContainer>
          </S.Form>
        </S.LoginContainer>
      </S.Container>
      <Version />
    </S.Wrapper>
  );
};

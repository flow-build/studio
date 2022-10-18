import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import flowbuildLogo from "assets/images/flowbuild-studio/default.svg";

import { Amplify } from "aws-amplify";
import amplifyConfig from "amplify-config";

import { SignUpForm } from "pages/register/components/sign-up";
import { SignInForm } from "pages/register/components/sign-in";
import object from "../../../package.json";

import * as S from "./styles";

Amplify.configure(amplifyConfig);

export const Register = () => {
  const [version, setVersion] = useState<string>();
  const [state, setState] = useState({
    signUpIsActive: false,
  });
  const data = object.version;

  useEffect(() => {
    setVersion(data as string);
  }, [version]);

  function toggleActivePage() {
    setState({ signUpIsActive: !state.signUpIsActive });
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.LoginContainer>
          <S.LogoContainer>
            <img src={flowbuildLogo} alt="Logo" />
          </S.LogoContainer>
          {state.signUpIsActive ? <SignUpForm /> : <SignInForm />}
          <S.RegisterButton
          title={state.signUpIsActive
            ? "Already a member? Log in"
            : "No account? Sign up"}
            onClick={toggleActivePage}
          >
          </S.RegisterButton>
        </S.LoginContainer>
      </S.Container>
      <S.VersionContainer>
        <S.Text>{version}</S.Text>
      </S.VersionContainer>
    </S.Wrapper>
  );
};

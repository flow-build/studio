import { useState } from "react";

import flowbuildLogo from "assets/images/flowbuild-studio/default.svg";

import { Amplify } from "aws-amplify";
import amplifyConfig from "amplify-config";

import { SignUpForm } from "pages/register/components/sign-up";
import { SignInForm } from "pages/register/components/sign-in";

import * as S from "./styles";
import { useVersion } from "shared/hooks/version/useVersion";

Amplify.configure(amplifyConfig);

export const Register = () => {
  const [state, setState] = useState({
    signUpIsActive: false,
  });
  const version = useVersion();
  const registerTitle = getButtonTitle(state.signUpIsActive);

  function getButtonTitle(isActive: boolean){
    if(isActive) {
      return 'Already a member? Log in'
    }
  
    return 'No account? Sign up'
  }

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

          <S.RegisterButtonContainer>
            <S.RegisterButton
              title={registerTitle}
              onClick={toggleActivePage}
            ></S.RegisterButton>
          </S.RegisterButtonContainer>
        </S.LoginContainer>
      </S.Container>

      <S.VersionContainer>
        <S.Text>{version}</S.Text>
      </S.VersionContainer>
    </S.Wrapper>
  );
};

import { useNavigate } from "react-router-dom";

import { Version } from "pages/auth/components/version";
import { Logo } from "pages/auth/components/logo";

import * as S from "./styles";

export const Error = () => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <S.Container>
        <S.MessageContainer>
          <Logo />
          <S.DivMessage>
            <S.Text>This email is already being used</S.Text>
            <S.ForgotPasswordButton onClick={()=>navigate("/forgot-password")} />
            <S.SignInButton  onClick={()=>navigate("/")} />
          </S.DivMessage>
        </S.MessageContainer>
      </S.Container>
      <Version />
    </S.Wrapper>
  );
};

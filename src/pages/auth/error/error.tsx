import { Version } from "pages/auth/components/version";
import { Logo } from "pages/auth/components/logo";

import * as S from "./styles";

export const Error = () => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.MessageContainer>
          <Logo />
          <S.DivMessage>
            <S.Text>This email is already being used</S.Text>
            <S.ForgotPasswordButton />
            <S.SignInButton />
          </S.DivMessage>
        </S.MessageContainer>
      </S.Container>
      <Version />
    </S.Wrapper>
  );
};

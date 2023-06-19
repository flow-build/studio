import React, { PropsWithChildren } from "react";

import * as S from "./styles";

type Props = PropsWithChildren<{
  onSubmit?: React.FormEventHandler<HTMLDivElement>;
}>;

export const GridWrapper: React.FC<Props> = ({ onSubmit, children }) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.LoginContainer>
          <S.FlowbuildLogo />

          <S.Form onSubmit={onSubmit}>{children}</S.Form>
        </S.LoginContainer>
      </S.Container>

      <S.ProjectVersion />
    </S.Wrapper>
  );
};

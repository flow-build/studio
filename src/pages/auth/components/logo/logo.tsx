import flowbuildLogo from "assets/images/flowbuild-studio/default.svg";

import * as S from "./styles";

export const Logo = () => {
  return (
    <S.LogoContainer>
      <img src={flowbuildLogo} alt="Logo" />
    </S.LogoContainer>
  );
};

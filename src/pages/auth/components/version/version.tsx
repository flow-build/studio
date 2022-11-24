import * as S from "./styles";

import { useVersion } from "shared/hooks/version/useVersion";

export const Version = () => {
    const version = useVersion();
  return (
    <S.VersionContainer>
      <S.Text>{version}</S.Text>
    </S.VersionContainer>
  );
};

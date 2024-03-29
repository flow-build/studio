import { useMemo } from "react";

import { LocalStorage } from "shared/utils/base-storage/local-storage";

import * as S from "./styles";

export const Metabase: React.FC = () => {
  const iframeUrl = useMemo(() => {
    const metabaseUrlConfig =
      LocalStorage.getInstance().getValueByKey<string>("DASHBOARD");

    return `${metabaseUrlConfig}/embed/dashboard/${metabaseUrlConfig}#theme=night&bordered=true&titled=true`;
  }, []);

  return (
    <S.Wrapper>
      <S.Frame src={iframeUrl} />
    </S.Wrapper>
  );
};

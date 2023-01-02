import { useMemo } from "react";
import { getStorageItem } from "shared/utils/storage";

import * as S from "./styles";

export const Metabase: React.FC = () => {
  const iframeUrl = useMemo(() => {
    const metabaseUrlConfig = getStorageItem("DASHBOARD");

    return `${metabaseUrlConfig}/embed/dashboard/${metabaseUrlConfig}#theme=night&bordered=true&titled=true`
}, []);

  return (
    <S.Wrapper>
      <S.Frame src={iframeUrl} />
    </S.Wrapper>
  );
};

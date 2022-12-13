import { getStorageItem } from "shared/utils/storage";

import * as S from "./styles";

export const Metabase: React.FC = () => {
  const iframeUrl = getIframURL();

  function getIframURL() {
    const metabaseUrlConfig = getStorageItem("DASHBOARD");
    return `${metabaseUrlConfig}/embed/dashboard/${metabaseUrlConfig}#theme=night&bordered=true&titled=true`
  }

  return (
    <S.Wrapper>
      <S.Frame src={iframeUrl} />
    </S.Wrapper>
  );
};

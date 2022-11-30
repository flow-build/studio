import sign from "jwt-encode";

import * as S from "./styles";

export const Metabase: React.FC = () => {
  const iframeUrl = getIframURL();

  function getIframURL() {
    const METABASE_SITE_URL = `${process.env.METABASE_SITE_URL}`
    const METABASE_SECRET_KEY = `${process.env.METABASE_SECRET_KEY}`

    const payload = {
      resource: { dashboard: 3 },
      params: {},
      exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
    };

    const token = sign(payload, METABASE_SECRET_KEY);

    return `${METABASE_SITE_URL}/embed/dashboard/${token}#theme=night&bordered=true&titled=true`;
  }

  return (
    <S.Wrapper>
      <S.Frame src={iframeUrl} />
    </S.Wrapper>
  );
};

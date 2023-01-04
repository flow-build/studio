import sign from "jwt-encode";

import * as S from "./styles";

export const Metabase: React.FC = () => {
  const iframeUrl = getIframURL();

  function getIframURL() {
    const METABASE_SITE_URL = process.env.REACT_APP_METABASE_SITE_URL;
    const METABASE_SECRET_KEY = process.env.REACT_APP_METABASE_SECRET_KEY as string;
    const dashboardId = process.env.REACT_APP_METABASE_DASHBOARD_ID ? parseInt(process.env.REACT_APP_METABASE_DASHBOARD_ID) : 2;

    const payload = {
      resource: { dashboard: dashboardId },
      params: {},
      exp: Math.round(Date.now() / 1000) + (10 * 60), // 10 minute expiration
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

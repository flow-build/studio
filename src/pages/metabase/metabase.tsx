import sign from "jwt-encode";

import * as S from "./styles";

export const Metabase: React.FC = () => {
  const METABASE_SITE_URL = "http://44.203.2.237:3001";
  const METABASE_SECRET_KEY =
    "050d23827a63357696a418d17a58e5445e6aafba57941014677add39107cbbc7";
  const payload = {
    resource: { dashboard: 3 },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };
  const token = sign(payload, METABASE_SECRET_KEY);
  const iframeUrl =
    METABASE_SITE_URL +
    "/embed/dashboard/" +
    token +
    "#theme=night&bordered=true&titled=true";
  return (
    <S.Frame>
      <iframe
        title="frame"
        src={iframeUrl}
        width="100%"
        height="650px"
        allowTransparency
      />
    </S.Frame>
  );
};

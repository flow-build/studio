import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sign from "jwt-encode";

import { IPayloadDashboardForm } from "pages/settings/types/IPayloadDashboardForm";

import { setDashboardUrl } from "services/api";

import { LocalStorage } from "shared/utils/base-storage/local-storage";

import { useSnackbar } from "shared/hooks/snackbar/useSnackbar";

import * as S from "./styles";

export const DashboardPanel: React.FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const urlMetabase = process.env.REACT_APP_METABASE_SITE_URL as string;
  const secretKeyMetabase = process.env.REACT_APP_METABASE_SECRET_KEY as string;
  const dashboardMetabaseNumber = process.env
    .REACT_APP_METABASE_DASHBOARD_NUMBER as string;

  async function onSubmitDashboard(payload: IPayloadDashboardForm) {
    try {
      setIsLoadingDashboard(true);

      const payloadMetabaseUrl = {
        resource: { dashboard: Number(payload.dashboardNumber) },
        params: {},
        exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
      };

      const token = sign(payloadMetabaseUrl, payload.metabaseSecretKey);

      const dashboardUrl = `${payload.metabaseSiteUrl}/embed/dashboard/${token}#theme=night&bordered=true&titled=true`;
      LocalStorage.getInstance().setValue("DASHBOARD", dashboardUrl);

      setDashboardUrl(
        `${payload.metabaseSiteUrl}/embed/dashboard/${token}#theme=night&bordered=true&titled=true`
      );

      const message = "Sucesso ao conectar com o servidor";
      snackbar.success(message);

      navigate("/dashboard");
    } catch (erro: any) {
      snackbar.error(erro.message);
    } finally {
      setIsLoadingDashboard(false);
    }
  }

  return (
    <S.Wrapper>
      <S.DashboardForm
        onSubmit={onSubmitDashboard}
        isLoading={isLoadingDashboard}
        defaultMetabaseUrl={urlMetabase}
        defaultSecretKey={secretKeyMetabase}
        defaultDashboardNumber={dashboardMetabaseNumber}
        labelmetabaseSiteUrl="URL Metabase Site"
        labelmetabaseSecretKey="Metabase Secret Key"
        labeldashboardNumber="Dashboard Number"
      />
    </S.Wrapper>
  );
};

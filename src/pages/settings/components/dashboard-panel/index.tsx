import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VariantType, useSnackbar } from "notistack";
import sign from "jwt-encode";
import jwtDecode from "jwt-decode";

import { IPayloadDashboardForm } from "pages/settings/types/IPayloadDashboardForm";

import { createToken } from "services/resources/token";
import { setDashboardUrl } from "services/api";

import { LocalStorage } from "shared/utils/base-storage/local-storage";
import { SessionStorage } from "shared/utils/base-storage/session-storage";

import * as S from "./styles";

export const DashboardPanel: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const urlMetabase = process.env.REACT_APP_METABASE_SITE_URL as string;
  const secretKeyMetabase = process.env.REACT_APP_METABASE_SECRET_KEY as string;
  const dashboardMetabaseNumber = process.env
    .REACT_APP_METABASE_DASHBOARD_NUMBER as string;

  function showNotification(message: string, variant: VariantType) {
    enqueueSnackbar(message, {
      autoHideDuration: 4000,
      variant,
    });
  }

  function getUserId() {
    const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

    if (!token) {
      return "";
    }

    const decoded = jwtDecode(token);
    SessionStorage.getInstance().setValue("TOKEN", token);
    return decoded;
  }

  async function onHandleToken() {
    const userId = getUserId() as string;
    const token = await createToken(userId);

    if (!token) {
      const message = "Erro no retorno do Token. Por favor tentar novamente!";
      showNotification(message, "error");
      return;
    }

    SessionStorage.getInstance().setValue("TOKEN", token);
  }

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

      await onHandleToken();

      const message = "Sucesso ao conectar com o servidor";
      showNotification(message, "success");
      navigate("/dashboard");
    } catch (erro: any) {
      showNotification(erro.message, "error");
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

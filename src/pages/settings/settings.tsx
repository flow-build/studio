import { useState } from "react";

import { Client } from "paho-mqtt";
import { v4 as uuidv4 } from "uuid";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";

import { IPayloadForm } from "pages/settings/types/IPayloadForm";
import { IPayloadDashboardForm } from "./types/IPayloadDashboardForm";
import { getStorageItem, setStorageItem } from "shared/utils/storage";
import { setBaseUrl, setDashboardUrl } from "services/api";
import { getAnonymousToken } from "services/resources/token";
import { useSnackbar, VariantType } from "notistack";
import { healthcheck } from "services/resources/settings";
import {
  removeProtocolHttps,
  removeProtocolWs,
  urlHasProtocolHttp,
  urlHasProtocolWs,
} from "./utils/string";

import * as S from "./styles";
import { useNavigate } from "react-router-dom";

export const Settings: React.FC = () => {
  const [isLoadingMqtt, setIsLoadingMqtt] = useState(false);
  const [isLoadingServer, setIsLoadingServer] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const urlServe = process.env.REACT_APP_BASE_URL;
  const portServer = process.env.REACT_APP_URL_PORT;

  const urlMetabase = process.env.REACT_APP_METABASE_SITE_URL as string;
  const secretKeyMetabase = process.env.REACT_APP_METABASE_SECRET_KEY as string;
  const dashboardMetabaseNumber = process.env.REACT_APP_METABASE_DASHBOARD_NUMBER as string;

  function showNotification(message: string, variant: VariantType) {
    enqueueSnackbar(message, {
      autoHideDuration: 4000,
      variant,
    });
  }

  function getUserId() {
    const token = getStorageItem("TOKEN");
    const decoded = jwt_decode(token);
    setStorageItem("TOKEN", token);
    return decoded;
  }

  async function onHandleToken() {
    const userId = getUserId() as string;
    const token = await getAnonymousToken(userId);

    if (!token) {
      const message = "Erro no retorno do Token. Por favor tentar novamente!";
      showNotification(message, "error");
      return;
    }

    setStorageItem("TOKEN", token);
  }
  async function onSubmitServer(payload: IPayloadForm) {
    let url = payload.url;

    try {
      if (urlHasProtocolHttp(url)) {
        url = removeProtocolHttps(url);
      }

      setIsLoadingServer(true);
      await healthcheck(`http://${url}`, payload.port);

      setStorageItem("SERVER_URL", `http://${url}:${payload.port}`);
      setBaseUrl(`http://${url}:${payload.port}`);
      onHandleToken();

      const message = "Sucesso ao conectar com o servidor";
      showNotification(message, "success");
    } catch (erro: any) {
      showNotification(erro.message, "error");
      console.log(erro);
    } finally {
      setIsLoadingServer(false);
    }
  }

  async function onSubmitMqtt(payload: IPayloadForm) {
    const id = uuidv4();
    let url = payload.url;

    try {
      if (urlHasProtocolHttp(url)) {
        const message = "Protocolo incorreto";
        showNotification(message, "error");
        return;
      }

      if (urlHasProtocolWs(url)) {
        url = removeProtocolWs(url);
      }

      const mqttConfig = {
        host: url,
        port: Number(payload?.port),
        clientId: id,
      };

      const client = new Client(
        mqttConfig.host,
        mqttConfig.port,
        mqttConfig.clientId
      );

      setIsLoadingMqtt(true);

      client.connect({
        timeout: 2,
        onSuccess: () => {
          setStorageItem("MQTT_URL", `${url}:${payload.port}`);
          onHandleToken();

          const message = "Sucesso ao conectar com o servidor";
          showNotification(message, "success");
          setIsLoadingMqtt(false);
        },
        onFailure: () => {
          const message = "Erro ao conectar com o servidor";
          showNotification(message, "error");
          setIsLoadingMqtt(false);
        },
      });

      client.disconnect();
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoadingMqtt(false);
      }, 5000);
    }
  }

  function onSubmitDashboard(payload: IPayloadDashboardForm) {
    try {
      setIsLoadingDashboard(true);

      const payloadMetabaseUrl = {
        resource: { dashboard: Number(payload.dashboardNumber) },
        params: {},
        exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
      };

      const token = sign(payloadMetabaseUrl, payload.metabaseSecretKey);

      setStorageItem(
        "DASHBOARD",
        `${payload.metabaseSiteUrl}/embed/dashboard/${token}#theme=night&bordered=true&titled=true`
      );

      setDashboardUrl(
        `${payload.metabaseSiteUrl}/embed/dashboard/${token}#theme=night&bordered=true&titled=true`
      )

      onHandleToken();

      const message = "Sucesso ao conectar com o servidor";
      showNotification(message, "success");
      navigate("/dashboard");
    } catch (erro: any) {
      showNotification(erro.message, "error");
    } finally {
      setIsLoadingServer(false);
    }
  }
  return (
    <S.Wrapper>
      <S.Title>Configurações</S.Title>

      <S.Form
        labelPort="Porta do servidor"
        labelUrl="URL do servidor do flowbuild"
        defaultUrl={urlServe}
        defaultPort={portServer}
        onSubmit={onSubmitServer}
        isLoading={isLoadingServer}
      />

      <S.Form
        labelPort="Porta do MQTT"
        labelUrl="URL do servidor de MQTT"
        onSubmit={onSubmitMqtt}
        isLoading={isLoadingMqtt}
      />

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


import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import _isEqual from "lodash/isEqual";
import cryptoJs from "crypto-js";

import Divider from "@mui/material/Divider";

import { TypeMenuItem } from "constants/type-menu-item";

import { useSidebar } from "pages/dashboard/components/sidebar/hooks/useSidebar";
import { useVersion } from "shared/hooks/version/useVersion";
import { ProcessIdSearch } from "pages/dashboard/components/sidebar/dialogs/process-id-search";

import * as S from "./styles";
import { Client, Message } from "paho-mqtt";
import { SessionStorage } from "shared/utils/base-storage/session-storage";
import jwtDecode from "jwt-decode";
import { LocalStorage } from "shared/utils/base-storage/local-storage";
import { TUser } from "models/user";
import { healthcheckMqtt } from "services/resources/engine-mqtt";
import { useSelector } from "react-redux";
import { RootState } from "store";

type Props = {
  isOpen: boolean;
};

enum StatusConnection {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}

export const Sidebar: React.FC<Props> = ({ isOpen }) => {
  const sidebar = useSidebar();
  const version = useVersion();
  const [statusConnection, setStatusConnection] = useState<StatusConnection>(
    StatusConnection.ERROR
  );

  const lastMqttUpdate = useSelector(
    (state: RootState) => state.settings.mqtt.lastUpdate
  );

  const clientRef = useRef<Client>();
  const lastMqttUpdateRef = useRef<Date>();

  const connectToMqtt = useCallback(async () => {
    const localInstance = LocalStorage.getInstance();

    const envHost = process.env.REACT_APP_MQTT_HOST ?? "";
    const envPort = process.env.REACT_APP_MQTT_PORT ?? "";

    const localHost = localInstance.getValueByKey<string>("MQTT_URL");
    const localPort = localInstance.getValueByKey<string>("MQTT_PORT");

    const hostMqtt = localHost ?? envHost;
    const portMqtt = localPort ?? envPort;

    if (!hostMqtt || !portMqtt) {
      return;
    }

    const id = uuidv4();

    const mqttConfig = {
      host: hostMqtt,
      port: Number(portMqtt),
      clientId: id,
    };

    const clientMqtt = new Client(
      mqttConfig.host,
      mqttConfig.port,
      mqttConfig.clientId
    );

    const usernameMqtt = localInstance.getValueByKey<string>("MQTT_USERNAME");
    const hashedPasswordMqtt =
      localInstance.getValueByKey<string>("MQTT_PASSWORD") ?? "";

    const passwordMqtt = cryptoJs.AES.decrypt(
      hashedPasswordMqtt,
      process.env.REACT_APP_CRYPTO_SECRET_KEY ?? ""
    ).toString(cryptoJs.enc.Utf8);

    const securityOptions: { [key: string]: string | boolean } = {};

    if (usernameMqtt && passwordMqtt) {
      securityOptions.userName = usernameMqtt;
      securityOptions.password = passwordMqtt;
      securityOptions.useSSL = true;
    }
    clientRef.current = clientMqtt;

    clientRef.current.connect({
      ...securityOptions,
      timeout: 2,
      onSuccess: async () => {
        setStatusConnection(StatusConnection.WARNING);

        const token =
          SessionStorage.getInstance().getValueByKey<string>("TOKEN");

        if (!token) {
          return;
        }

        const decoded = jwtDecode(token) as TUser;

        if (clientRef.current) {
          const namespace =
            localInstance.getValueByKey<string>("MQTT_NAMESPACE") ?? "";

          const topic = `${namespace}/beacon/${decoded.actor_id}`;
          clientRef.current.subscribe(topic);
        }

        /* TODO: Verificar se existe salvo no local os dados do flowbuild server e do mqtt server */
        /* TODO: Caso tenha as configurações ja definidas, fazer a request para {{REACT_APP_BASE_URL}}/cockpit/connection/beacon */
        // Requisição citada no TODO acima (já tem o service implementado): healthcheckMqtt
        await healthcheckMqtt({ token });
      },
      onFailure: () => {
        setStatusConnection(StatusConnection.ERROR);
      },
    });

    clientRef.current.onMessageArrived = (message: Message) => {
      const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

      const payload = JSON.parse(message.payloadString);

      if (_isEqual(token, payload?.token)) {
        setStatusConnection(StatusConnection.SUCCESS);
      }
    };
  }, []);

  useEffect(() => {
    if (!clientRef?.current && !clientRef.current?.isConnected()) {
      connectToMqtt();
    }
  }, [connectToMqtt]);

  useEffect(() => {
    if (!_isEqual(lastMqttUpdate, lastMqttUpdateRef.current)) {
      const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

      if (!token) {
        return;
      }

      const decoded = jwtDecode(token) as TUser;

      const namespace =
        LocalStorage.getInstance().getValueByKey<string>("MQTT_NAMESPACE") ??
        "";

      const topic = `${namespace}/beacon/${decoded.actor_id}`;
      clientRef.current?.unsubscribe(topic);

      clientRef.current?.disconnect();
      connectToMqtt();
      lastMqttUpdateRef.current = lastMqttUpdate;
    }
  }, [lastMqttUpdate, connectToMqtt]);

  useEffect(() => {
    return () => {
      if (clientRef.current?.isConnected()) {
        console.log("disconnect");
        clientRef.current?.disconnect();
      }
    };
  }, []);

  return (
    <>
      <S.Drawer open={isOpen}>
        <S.DrawerHeader />

        <Divider />

        <S.CustomList>
          <div>
            {sidebar.menuItems.map((menuItem, index) =>
              menuItem.type === TypeMenuItem.NAVIGATION ? (
                <Link key={index.toString()} to={menuItem.pathname}>
                  <S.MenuItem
                    isOpen={isOpen}
                    icon={menuItem.icon}
                    name={menuItem.name}
                    tooltip={menuItem.tooltip}
                  />
                </Link>
              ) : (
                <S.MenuItem
                  key={index.toString()}
                  onClick={menuItem.onClick}
                  isOpen={isOpen}
                  icon={menuItem.icon}
                  name={menuItem.name}
                  tooltip={menuItem.tooltip}
                />
              )
            )}
          </div>

          <S.VersionContainer>
            <ConnectWithoutContactIcon color={statusConnection} />

            <S.Text>{version}</S.Text>
          </S.VersionContainer>
        </S.CustomList>
      </S.Drawer>

      {sidebar.isOpenDialog && (
        <ProcessIdSearch
          isOpen={sidebar.isOpenDialog}
          onClose={sidebar.onCloseDialog}
        />
      )}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import _isEqual from "lodash/isEqual";

import { styled, Theme, CSSObject } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";

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

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

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
  const [isConnect, setIsConnect] = useState(false);
  const [statusConnection, setStatusConnection] = useState<StatusConnection>(
    StatusConnection.ERROR
  );

  useEffect(() => {
    const connectToMqtt = async () => {
      // const teste = await healthcheckMqtt();
      // console.log({ teste });
      const localInstance = LocalStorage.getInstance();

      const hostMqtt = localInstance.getValueByKey<string>("MQTT_URL");
      const portMqtt = localInstance.getValueByKey<string>("MQTT_PORT");

      if (!hostMqtt || !portMqtt) {
        return;
      }

      const id = uuidv4();

      const mqttConfig = {
        host: hostMqtt,
        port: Number(portMqtt),
        clientId: id,
      };

      const client = new Client(
        mqttConfig.host,
        mqttConfig.port,
        mqttConfig.clientId
      );

      // console.log({ teste });

      const usernameMqtt = localInstance.getValueByKey<string>("MQTT_USERNAME");
      const passwordMqtt = localInstance.getValueByKey<string>("MQTT_PASSWORD");

      const securityOptions: { [key: string]: string | boolean } = {};

      if (usernameMqtt && passwordMqtt) {
        securityOptions.userName = usernameMqtt;
        securityOptions.password = passwordMqtt;
        securityOptions.useSSL = true;
      }

      client.connect({
        ...securityOptions,
        timeout: 2,
        onSuccess: async () => {
          setIsConnect(true);
          setStatusConnection(StatusConnection.WARNING);

          const token =
            SessionStorage.getInstance().getValueByKey<string>("TOKEN");

          if (!token) {
            return;
          }

          const decoded = jwtDecode(token) as TUser;

          const namespace =
            localInstance.getValueByKey<string>("MQTT_NAMESPACE") ?? "";

          const topic = `${namespace}/beacon/${decoded.actor_id}`;
          client.subscribe(topic);

          /* TODO: Verificar se existe salvo no local os dados do flowbuild server e do mqtt server */
          /* TODO: Caso tenha as configurações ja definidas, fazer a request para {{REACT_APP_BASE_URL}}/cockpit/connection/beacon */
          // Requisição citada no TODO acima (já tem o service implementado): healthcheckMqtt
          await healthcheckMqtt({ token });
        },
        onFailure: () => {
          setStatusConnection(StatusConnection.ERROR);
        },
      });

      client.onMessageArrived = (message: Message) => {
        const token =
          SessionStorage.getInstance().getValueByKey<string>("TOKEN");

        const payload = JSON.parse(message.payloadString);

        if (_isEqual(token, payload?.token)) {
          setStatusConnection(StatusConnection.SUCCESS);
        }
      };
    };

    if (!isConnect) {
      connectToMqtt();
    }

    /* return () => {

    } */
  }, [isConnect]);

  return (
    <>
      <Drawer variant="permanent" open={isOpen}>
        <DrawerHeader />
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
      </Drawer>

      {sidebar.isOpenDialog && (
        <ProcessIdSearch
          isOpen={sidebar.isOpenDialog}
          onClose={sidebar.onCloseDialog}
        />
      )}
    </>
  );
};

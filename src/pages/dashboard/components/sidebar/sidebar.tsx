import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Client } from "paho-mqtt";

import { TypeMenuItem } from "constants/type-menu-item";

import { ProcessIdSearch } from "pages/dashboard/components/sidebar/dialogs/process-id-search";
import { useSidebar } from "pages/dashboard/components/sidebar/hooks/useSidebar";
import { useConnectionMqtt } from "pages/dashboard/components/sidebar/hooks/useConnectionMqtt";

import { useVersion } from "shared/hooks/version/useVersion";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
};

export const Sidebar: React.FC<Props> = ({ isOpen }) => {
  const sidebar = useSidebar();
  const version = useVersion();
  const { connectToMqtt, statusConnection } = useConnectionMqtt();

  const clientRef = useRef<Client>();

  const tryingConnection = useRef(false);

  useEffect(() => {
    const connect = async () => {
      const isTryingConnect = tryingConnection.current;
      const isClientConnected =
        clientRef?.current && clientRef.current?.isConnected();

      if (!isTryingConnect && !isClientConnected) {
        tryingConnection.current = true;
        await connectToMqtt();
      }

      tryingConnection.current = false;
    };

    connect()
      .then()
      .catch(() => console.error("Mqtt Connection Error"));
  }, [connectToMqtt]);

  return (
    <>
      <S.Drawer open={isOpen}>
        <S.DrawerHeader />

        <S.Divider />

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
            <S.ConnectIcon color={statusConnection} />

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

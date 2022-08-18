import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { Content } from "shared/components/content";
import { Header } from "pages/dashboard/components/header";
import { Sidebar } from "pages/dashboard/components/sidebar";
import sign from "jwt-encode";

import * as S from "./styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Dashboard: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const onMenuClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

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
    <S.Wrapper>
      <Header isOpen={menuIsOpen} onMenuClick={onMenuClick} />
      <Sidebar isOpen={menuIsOpen} />
      <Content padding={2} pt={0}>
        <DrawerHeader />
        <S.Frame>
          <iframe
            title="frame"
            src={iframeUrl}
            width="100%"
            height="650px"
            allowTransparency
          />
        </S.Frame>
        <Outlet />
      </Content>
    </S.Wrapper>
  );
};


import styled from "styled-components";

import { LinkRouter } from "shared/components/breadcrumbs/components/text/components/link";

import Typography from "@mui/material/Typography";

export const NavTitle = styled(Typography).attrs({
  color: "#acacac",
})``;

export const NavLink = styled(LinkRouter).attrs({
  underline: "hover",
  color: "inherit",
})``;

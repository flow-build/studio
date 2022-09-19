import styled from "styled-components";

import Grid from "@mui/material/Grid";
import { DialogTitle } from "@mui/material";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export const Wrapper = styled(Grid).attrs({
  container: true,
  spacing: 2,
  sx: { marginTop: 0 },
})`
  height: calc(100% - 64px);
`;

export const HeaderContainer = styled.div`
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(DialogTitle)``;

export const List = styled.ul``;

export const Items = styled.li``;

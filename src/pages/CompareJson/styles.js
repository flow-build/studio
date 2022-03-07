import styled from "styled-components";

import { Grid as MuiGrid } from "@mui/material";

export const Grid = styled(MuiGrid).attrs({
  height: "100%",
  container: true,
  // spacing: 1,
})`
  overflow: hidden;
`;

export const Item = styled(MuiGrid).attrs({
  item: true,
  xs: 6,
})`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const BigItem = styled(MuiGrid).attrs({
  item: true,
  xs: 12,
})`
  height: 50px;
`;

import styled from "styled-components";

import Grid from "@mui/material/Grid";

export const Wrapper = styled(Grid).attrs({
  container: true,
  spacing: 2,
  sx: { marginTop: 0 },
})`
  height: calc(100% - 64px);
`;

export const Frame = styled.iframe.attrs({
  allowTransparency: true,
  title: "metabase",
})`
  width: 100%;
  height: 100%;
`;

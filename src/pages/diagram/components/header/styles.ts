import styled from "styled-components";

import Box from "@mui/material/Box";
import MuiTooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const Wrapper = styled(Box).attrs({
  sx: {
    background: (theme) => theme.palette.background.paper,
  },
})`
  margin: 16px 9px 9px 31px;
  height: 48px;
  display: flex;
  align-items: center;
  flex: 0.7;
  padding: 5px;
  border-radius: 15px;
`;

export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 24px;
  margin-right: 9px;
`;

export const Title = styled(Typography).attrs({
  variant: "h6",
})``;

export const Tooltip = styled(MuiTooltip)``;

export const Status = styled(Box).attrs({})`
  display: flex;
  justify-content: space-between;
  width: 30px;
  height: 30px;
  opacity: 70%;
  margin-right: 24px;
`;


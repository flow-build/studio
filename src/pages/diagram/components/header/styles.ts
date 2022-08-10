import styled from "styled-components";

import Box from "@mui/material/Box";
import MuiTooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { default as BaseSyncIcon } from "@mui/icons-material/Sync";
import { default as BaseSyncDisabledIcon } from "@mui/icons-material/SyncDisabled";

export const Wrapper = styled(Box).attrs({
  sx: {
    background: (theme) => theme.palette.background.paper,
  },
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0.25;
  padding: 15px;
  border-radius: 0 0 4px 4px;
`;

export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Title = styled(Typography).attrs({
  variang: "h2",
})``;

export const Tooltip = styled(MuiTooltip)``;

export const SyncIcon = styled(BaseSyncIcon)`
  color: white;
`;

export const SyncDisabledIcon = styled(BaseSyncDisabledIcon)``;

import styled from "styled-components";

import Box from "@mui/material/Box";
import MuiTooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const Wrapper = styled(Box)<{ hideHeader: boolean }>`
  margin: 16px 9px 9px 31px;
  display: flex;
  align-items: center;
  flex: 0.7;
  border-radius: 15px;
  background: ${({ theme }) => theme.palette.primary.dark};

  ${({ hideHeader }) => hideHeader && { padding: 0, flex: "unset" }}
`;

export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 24px;
  margin-right: 9px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div<{ gap?: number }>`
  display: flex;
  align-items: center;

  ${({ gap }) => gap && { gap }};
`;

export const SpacedRow = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 6px 20px;
`;

export const Title = styled(Typography).attrs({
  variant: "h6",
})``;

export const Subtitle = styled(Typography).attrs({
  variant: "h6",
})`
  font-size: 14px;
`;

export const Tooltip = styled(MuiTooltip)``;

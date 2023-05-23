import { Typography } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px;
  width: 100%;
`;

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.palette.background.default};
  font-size: 14px;
`;

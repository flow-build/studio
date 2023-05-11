import styled from "styled-components";

import { InputText } from "shared/components/input-text";
import { Button, CircularProgress, Grid } from "@mui/material";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

export const Row = styled(Grid)`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

export const Input = styled(InputText)<{ small?: boolean }>`
  width: ${({ small }) => (small ? 262 : 550)}px;
`;

export const SubmitButton = styled(Button)`
  width: 6rem;

  &:not(:disabled) {
    color: white;
  }
`;

export const Loading = styled(CircularProgress).attrs({
  color: "inherit",
  size: "1.3rem",
})``;

export const TextSubmitButton = styled.p``;

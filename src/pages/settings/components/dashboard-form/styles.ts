import styled from "styled-components";

import { InputText } from "shared/components/input-text";
import { Button, CircularProgress } from "@mui/material";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
  margin-bottom: 1rem;
`;

export const Input = styled(InputText)<{ small?: boolean }>`
  width: ${({ small }) => (small ? 262 : 550)}px;
`;

export const SubmitButton = styled(Button)`
  width: 6rem;
  height: 3.5rem;
`;

export const Loading = styled(CircularProgress).attrs({
  color: "inherit",
  size: "1.3rem",
})``;

export const TextSubmitButton = styled.p``;


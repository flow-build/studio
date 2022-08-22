import styled from "styled-components";

import { StatusConnection as BaseStatusConnection } from "pages/settings/components/form/components/status-connection";

import { Button as BaseButton } from "shared/components/button";
import { InputText } from "shared/components/input-text";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

export const Input = styled(InputText)<{ small?: boolean }>`
  width: ${({ small }) => (small ? 250 : 550)}px;
`;

export const Button = styled(BaseButton)``;

export const StatusConnection = styled(BaseStatusConnection)``;

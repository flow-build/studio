import { Button, CircularProgress, FormControlLabel } from "@mui/material";
import { InputText } from "shared/components/input-text";
import styled from "styled-components";

export const Wrapper = styled.div``;

// NSP - NameSpace
// URL - Input Url
// PRT - Input Port
// BTN - Radio Button
// USR - Input Username
// PSW - Input Password

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr 1fr;
  grid-template-rows: repeat(3, 56px);
  grid-template-areas:
    "NSP   .   ."
    "URL URL PRT"
    "BTN USR PSW";
  column-gap: 10px;
  row-gap: 16px;
`;

export const NamespaceInput = styled(InputText).attrs({
  label: "Namespace",
  placeholder: "Namespace",
})`
  grid-area: NSP;
`;

export const UrlInput = styled(InputText).attrs({
  label: "URL do servidor",
  placeholder: "URL do servidor",
})`
  grid-area: URL;
`;

export const PortInput = styled(InputText).attrs({
  label: "Porta",
  placeholder: "Porta",
})`
  grid-area: PRT;
`;

export const RadioButton = styled(FormControlLabel).attrs({
  label: "WSS",
})`
  grid-area: BTN;
`;

export const UsernameInput = styled(InputText).attrs({
  label: "Usuário",
  placeholder: "Usuário",
})`
  grid-area: USR;
`;

export const PasswordInput = styled(InputText).attrs({
  label: "Senha",
  placeholder: "Senha",
})`
  grid-area: PSW;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

export const Loading = styled(CircularProgress).attrs({
  color: "inherit",
  size: "1.3rem",
})``;

export const SubmitButton = styled(Button)`
  width: 6rem;

  &:not(:disabled) {
    color: white;
  }
`;

export const TextSubmitButton = styled.p``;

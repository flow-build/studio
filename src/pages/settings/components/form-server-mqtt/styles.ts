import styled from "styled-components";
import { InputText } from "shared/components/input-text";
import Button from "@mui/material/Button";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const SubmitButton = styled(Button).attrs({
  variant: "contained",
})`
  width: 8rem;
  height: 3.5rem;
`;

export const IconSuccess = styled(CheckCircleIcon).attrs({})`
  color: green;
`;

export const IconError = styled(CancelIcon).attrs({})`
  color: red;
`;

export const Paragraph = styled.p`
  color: #fff;
`;

export const FormMqtt = styled.form`
  width: 55rem;
  height: 1rem;
  margin-top: 5rem;
`;

export const ContainerMqtt = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 1.5rem;
`;

export const InputMQTTServerURL = styled(InputText).attrs({
  id: "outlined-multiline-flexible",
  label: "URL do servidor de MQT",
})`
  width: 25rem;
  margin-top: 1rem;
`;

export const InputMQTTServerPort = styled(InputText).attrs({
  id: "outlined-multiline-flexible",
  label: "Porta do MQT",
})`
  width: 10rem;
  margin-top: 1rem;
`;

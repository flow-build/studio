import styled from "styled-components";
import { InputText } from "shared/components/input-text";
import Button from "@mui/material/Button";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const Container = styled.div``;

export const Title = styled.h1`
  color: #fff;
  margin: 2rem 1rem;
`;

export const FormServer = styled.form`
  width: 55rem;
  height: 1rem;
  margin-top: 5rem;
`;

export const ContainerServer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InputServerURL = styled(InputText).attrs({
  id: "outlined-multiline-flexible",
  label: "URL do servidor do flowbuild",
})`
  width: 25rem;
  margin-top: 1rem;
`;

export const InputServerPort = styled(InputText).attrs({
  id: "outlined-multiline-flexible",
  label: "Porta do flowbuild",
})`
  width: 10rem;
  margin-top: 1rem;
`;

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

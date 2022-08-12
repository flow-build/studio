import styled from "styled-components";
import { InputText } from "shared/components/input-text";
import Button from "@mui/material/Button";

export const Container = styled.div``;

export const Title = styled.h1`
  color: #fff;
  margin: 2rem 1rem;
`;

export const FormInputs = styled.form`
  width: 30rem;
  height: 24rem;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
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
  label: "Porta do servidor do flowbuild",
})`
  width: 25rem;
  margin-top: 1rem;
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
  label: "Porta do servidor de MQT",
})`
  width: 25rem;
  margin-top: 1rem;
`;

export const SubmitButton = styled(Button).attrs({
  variant: "contained",
})`
  width: 25rem;
  height: 3.5rem;
  margin-top: 0.8rem;
`;

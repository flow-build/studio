import styled from "styled-components";

// import { FormServerMqtt } from "pages/settings/components/form-server-mqtt";
// import { FormServerFlowbuild } from "pages/settings/components/form-server-flowbuild";
import { Form as BaseForm } from "pages/settings/components/form";
import { Button as BaseButton } from "shared/components/button";

export const Wrapper = styled.div``;

export const Title = styled.h1`
  color: #fff;
  margin: 2rem 1rem;
`;

// export const FormMqtt = styled(FormServerMqtt)``;

// export const FormServer = styled(FormServerFlowbuild)``;

export const Form = styled(BaseForm)``;

export const Button = styled(BaseButton)``;

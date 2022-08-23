import styled from "styled-components";
import { Form as BaseForm } from "pages/settings/components/form";
import { Button as BaseButton } from "shared/components/button";

export const Wrapper = styled.div``;

export const Title = styled.h1`
  color: #fff;
  margin: 2rem 1rem;
`;

export const Form = styled(BaseForm)``;

export const Button = styled(BaseButton)`
  width: 6rem;
  height: 3.5rem;
`;

import { useState } from "react";
import { Auth } from "aws-amplify";

import _isEmpty from "lodash/isEmpty";

import { AwsError } from "constants/aws-error";
import { Error } from "pages/register/components/sign-up/components/form-sign-up/components/error";

import * as S from "./styles";

type Props = {
  onClick: (email: string) => void;
};

export const FormEmail: React.FC<Props> = ({
  onClick,
}) => {
  const [payload, setPayload] = useState({
    email: "",
    codeIsMissing: false,
    emailAlreadyExist: false,
    userNotFound: false,
    error: false,
  });

  const disabled = _isEmpty(payload.email);

  async function handleSubmit() {
    try {
      const response = await Auth.confirmSignUp(payload.email, "00", {
        forceAliasCreation: false,
      });
      console.log(response);
      onClick(payload.email);
    } catch (error: any) {
      if (error.code === AwsError.CODE_IS_EXPIRED) {
        console.log(error);
        onClick(payload.email);
      }

      if (error.code === AwsError.CODE_IS_MISSING ||
        error.code === AwsError.EMAIL_ALREADY_EXIST 
      ) {
        console.log(error);
        setPayload((prev) => ({ ...prev, error: true }));
      }
      
      console.log(error);
    }
  }

  function handleChange(value: string) {
    setPayload((prev) => ({ ...prev, email: value }));
  }

  if (payload.error) {
    return <Error />;
  }
  return (
    <>
      <S.Input
        label="E-mail"
        type="text"
        name="email"
        placeholder="Type your e-mail"
        value={payload.email}
        onChange={(evento) => handleChange(evento.target.value)}
      />
      <S.SubmitContainer>
        <S.SubmitButton
          disabled={disabled}
          title={"Next"}
          onClick={handleSubmit}
        />
      </S.SubmitContainer>
    </>
  );
};

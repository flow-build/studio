import { useState } from "react";
import _isEmpty from "lodash/isEmpty";

import * as S from "./styles";

type Props = {
  onClick: (email: string) => void;
};

export const FormEmail: React.FC<Props> = ({ onClick }) => {
  const [payload, setPayload] = useState({
    email: "",
  });

  const disabled = _isEmpty(payload.email);

  function handleChange(value: string) {
    setPayload((prev) => ({ ...prev, email: value }));
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
      <S.IconContainer>
        <S.SubmitButton
          disabled={disabled}
          title={"Next"}
          onClick={() => onClick(payload.email)}
        ></S.SubmitButton>
      </S.IconContainer>
    </>
  );
};

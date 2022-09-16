import { useState } from "react";
import * as S from "./styles";

type Props = {
  onClose?: () => void;
  onConfirm: (payload: string) => void;
};

export const EmptyInputSchema: React.FC<Props> = ({ onClose, onConfirm }) => {
  const [payload, setPayload] = useState<string>();

  function onSubmit() {
    if (payload) {
      onConfirm(payload);
    }
  }

  return (
    <>
      <S.Content>
        <S.BoxContent>
          <S.BoxMessage>
            <S.Text>
              The process does not require any formal input schema
            </S.Text>
          </S.BoxMessage>
          <S.Text>
            Initial Bag - Do you want to provide optional data?
            <S.Editor onChange={(newValue) => setPayload(newValue)} />
          </S.Text>
        </S.BoxContent>
        <S.ActionsContainer>
          <S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
          <S.OkButton onClick={onSubmit}>Start</S.OkButton>
        </S.ActionsContainer>
      </S.Content>
    </>
  );
};

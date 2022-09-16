import * as S from "./styles";

type Props = {
  success: boolean;
  message: string;
};

export const StatusConnection: React.FC<Props> = ({ success, message }) => {
  const icon = success ? <S.SuccessIcon /> : <S.ErrorIcon />;

  return (
    <S.Wrapper>
      {icon} <S.Message>{message}</S.Message>
    </S.Wrapper>
  );
};

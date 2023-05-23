import * as S from "./styles";

type Props = {};

export const Footer: React.FC<Props> = () => {
  return (
    <S.Wrapper>
      <S.Text>Process ID: 2d85ff30-ef4d-11ed-b796-79a5d4124e32</S.Text>
      <S.Text>| Status: Running |</S.Text>
      <S.Text>Current Node: ABC-DEF</S.Text>
    </S.Wrapper>
  );
};

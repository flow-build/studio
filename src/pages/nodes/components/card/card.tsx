import * as S from "./styles";

export const Card: React.FC<{}> = () => {
  return (
    <S.Wrapper>
      <S.BoxContent>
        <S.Title>Visitors</S.Title>
        <S.Text>24.365</S.Text>
        <S.BoxText>
          <S.Percentage>14%</S.Percentage>
          <S.Period>Since last week</S.Period>
        </S.BoxText>
      </S.BoxContent>
    </S.Wrapper>
  );
};


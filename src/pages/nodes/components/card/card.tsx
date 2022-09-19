import * as S from "./styles";

interface PropsCategory {
  category: string;
  nodes: string;
}

export const Card: React.FC<PropsCategory> = ({ category, nodes }) => {
  return (
    <S.BoxContent>
      <S.Title>{category}</S.Title>
      <S.Text>{nodes}</S.Text>
      <S.BoxText>
        <S.Percentage>14%</S.Percentage>
        <S.Period>Since last week</S.Period>
      </S.BoxText>
    </S.BoxContent>
  );
};


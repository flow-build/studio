import * as S from "./styles";

interface PropsCategory {
  title: string;
  nodes: string;
  nodeType: string;
}

export const Card: React.FC<PropsCategory> = ({ title, nodes, nodeType }) => {
  return (
    <S.BoxContent>
      <S.Title>{title}</S.Title>
      <S.Text>Nodes: {nodes}</S.Text>
      <S.Text>{nodeType}</S.Text>
    </S.BoxContent>
  );
};


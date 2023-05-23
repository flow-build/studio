import { useSelector } from "react-redux";
import * as S from "./styles";
import { RootState } from "store";

type Props = {};

export const Footer: React.FC<Props> = () => {
  const { isWatching, currentNode, processId, status } = useSelector(
    (state: RootState) => state.processBar
  );

  if (!isWatching) {
    return <></>;
  }

  return (
    <S.Wrapper>
      <S.Text>Process ID: {processId}</S.Text>
      <S.Text>| Status: {status} |</S.Text>
      <S.Text>Current Node: {currentNode}</S.Text>
    </S.Wrapper>
  );
};

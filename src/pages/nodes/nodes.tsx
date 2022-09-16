import * as S from "./styles";

import { ContentHeader } from "shared/components/content-header";

export const Nodes: React.FC<{}> = () => {
  return (
    <S.Wrapper>
      <ContentHeader
        title="Nodes"
        // subtitle={`Process id: ${processId}`}
        // hasInput={false}
        // buttonTitle="Atualizar"
        // onButtonClick={request}
        // showToggle={false}
      />
      <S.Title>Nodes </S.Title>
    </S.Wrapper>
  );
};


import * as S from "./styles";

import { ContentHeader } from "shared/components/content-header";
import { Card } from "./components/card";

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
      <Card />
    </S.Wrapper>
  );
};


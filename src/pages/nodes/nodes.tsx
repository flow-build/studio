import * as S from "./styles";

import { ContentHeader } from "shared/components/content-header";
import { Card } from "./components/card";
import { useEffect, useState } from "react";
import { listNodes } from "services/resources/nodes/nodes";

export const Nodes: React.FC<{}> = () => {
  const [payload, setPayload] = useState({
    categories: [],
    types: [],
  });

  async function getListNodes() {
    const response = await listNodes();
    setPayload(response?.data);
    console.log("response", response?.data);
  }

  useEffect(() => {
    getListNodes();
  }, []);

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

      <S.List>
        <S.Items>
          {payload?.categories?.map(({ category, nodes }) => (
            <Card category={category} nodes={nodes} />
          ))}
        </S.Items>
      </S.List>
    </S.Wrapper>
  );
};


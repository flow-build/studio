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
  }

  useEffect(() => {
    getListNodes();
  }, []);

  return (
    <S.Wrapper>
      <ContentHeader
        title="Nodes"
        hasInput={false}
        showToggle={false}
        hasButton={false}
      />
      <S.ContentList>
        <S.List>
          <S.Items>
            {payload?.categories?.map(({ category, nodes }) => (
              <Card title={category} nodes={nodes} nodeType={"Categories"} />
            ))}
            {payload?.types?.map(({ type, nodes }) => (
              <Card title={type} nodes={nodes} nodeType={"Types"} />
            ))}
          </S.Items>
        </S.List>
      </S.ContentList>
    </S.Wrapper>
  );
};


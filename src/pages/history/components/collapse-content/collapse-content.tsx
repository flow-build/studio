import _isEmpty from "lodash/isEmpty";

import { TState } from "models/state";
import { TableContent } from "../table-content";

import * as S from "./styles";

type Props = {
  state: TState;
};

export const CollapseContent: React.FC<Props> = ({ state }) => {
  if (_isEmpty(state.result)) {
    return (
      <S.BoxTable>
        <S.TitleTable>Result</S.TitleTable>
        <S.TextTable>No result data...</S.TextTable>
      </S.BoxTable>
    );
  }

  return (
    <>
      <TableContent title="Bag" copyValue={state.bag} editorValue={state.bag} />
      <TableContent
        title="Result"
        copyValue={state.result}
        editorValue={state.result}
      />
      <TableContent
        title="Actor data"
        copyValue={state.actor_data}
        editorValue={state.actor_data}
      />
    </>
  );
};

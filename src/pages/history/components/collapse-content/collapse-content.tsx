import _isEmpty from "lodash/isEmpty";

import { TState } from "models/state";

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
      <S.Content title="Bag" copyValue={state.bag} editorValue={state.bag} />

      {state.error === null ? (
        <S.Content
          title="Result"
          copyValue={state.result}
          editorValue={state.result}
        />
      ) : (
        <S.Content
          title="Error"
          copyValue={state.error}
          editorValue={state.error}
        />
      )}

      <S.Content
        title="Actor data"
        copyValue={state.actor_data}
        editorValue={state.actor_data}
      />
    </>
  );
};

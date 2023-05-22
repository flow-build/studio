import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";

import { TState } from "models/state";

import { CollapseContent } from "pages/history/components/collapse-content";

import { getDateTimeFormatByDate } from "shared/utils/date";

import { RootState } from "store";
import { setNewJson, setOldJson } from "store/slices/compare-page";
import { Button } from "shared/components/button";

enum SIDE {
  LEFT,
  RIGHT,
}

export function useTable(states: TState[]) {
  const dispatch = useDispatch();
  const comparePageState = useSelector((store: RootState) => store.comparePage);

  function parseJson<T>(jsonStringfied?: string) {
    if (_isEmpty(jsonStringfied)) {
      return undefined;
    }

    return JSON.parse(jsonStringfied as string) as T;
  }

  function getIfJsonIsAlreadySaved(state: TState, otherState?: TState) {
    return _isEqual(otherState?.id, state.id);
  }

  const clearCompare = useCallback(
    (side: SIDE) => {
      if (_isEqual(side, SIDE.LEFT)) {
        return dispatch(setOldJson(undefined));
      }
      return dispatch(setNewJson(undefined));
    },
    [dispatch]
  );

  const handleIconClick = useCallback(
    (side: SIDE, state: TState) => {
      const compareLeft = parseJson<TState>(comparePageState.oldJson);
      const compareRight = parseJson<TState>(comparePageState.newJson);

      if (_isEqual(side, SIDE.LEFT)) {
        const isSavedOnLeft = getIfJsonIsAlreadySaved(state, compareLeft);

        if (isSavedOnLeft) {
          return clearCompare(SIDE.LEFT);
        }

        const isSavedOnRight = getIfJsonIsAlreadySaved(state, compareRight);

        if (isSavedOnRight) {
          clearCompare(SIDE.RIGHT);
        }

        dispatch(setOldJson(JSON.stringify(state)));
      }

      if (_isEqual(side, SIDE.RIGHT)) {
        const isSavedOnRight = getIfJsonIsAlreadySaved(state, compareRight);

        if (isSavedOnRight) {
          return clearCompare(SIDE.RIGHT);
        }

        const isSavedOnLeft = getIfJsonIsAlreadySaved(state, compareLeft);

        if (isSavedOnLeft) {
          clearCompare(SIDE.LEFT);
        }

        dispatch(setNewJson(JSON.stringify(state)));
      }
    },
    [clearCompare, comparePageState.newJson, comparePageState.oldJson, dispatch]
  );

  function handleIcon(json: string | undefined, state: TState) {
    if (!_isEmpty(json)) {
      const parsedJson = JSON.parse(json as string) as TState;
      return _isEqual(state.id, parsedJson.id);
    }

    return false;
  }

  const columnData = useMemo(() => {
    return [
      { id: "id", name: "ID" },
      { id: "node", name: "Node" },
      { id: "nextNode", name: "Next node" },
      { id: "status", name: "Status" },
      { id: "createdAt", name: "Created at" },
      { id: "actions", name: "Actions" },
    ];
  }, []);

  const rows = useMemo(() => {
    return states.map((state) => {
      const items = [
        state.id,
        state.node_id,
        state.next_node_id ?? "null",
        state.status,
        getDateTimeFormatByDate(state.created_at),
      ];

      const actions = [
        {
          icon: handleIcon(comparePageState.oldJson, state)
            ? () => <Button title="Left" variant="contained" />
            : () => <Button title="Left" variant="outlined" />,
          tooltip: "selecionar processo",
          onClick: () => {
            handleIconClick(SIDE.LEFT, state);
          },
        },
        {
          icon: handleIcon(comparePageState.newJson, state)
            ? () => <Button title="Right" variant="contained" />
            : () => <Button title="Right" variant="outlined" />,
          tooltip: "selecionar processo",
          onClick: () => {
            handleIconClick(SIDE.RIGHT, state);
          },
        },
      ];

      const collapseContent = <CollapseContent state={state} />;

      return { items, collapseContent, actions };
    });
  }, [
    states,
    comparePageState.oldJson,
    comparePageState.newJson,
    handleIconClick,
  ]);

  return { columnData, rows };
}

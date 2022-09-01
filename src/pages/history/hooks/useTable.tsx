import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LooksOne, LooksTwo, CheckBox } from "@mui/icons-material";

import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";

import { TState } from "models/state";

import { CollapseContent } from "pages/history/components/collapse-content";

import { getLongFormatByDate } from "shared/utils/date";

import { RootState } from "store";
import { setNewJson, setOldJson } from "store/slices/compare-page";
import { useNavigate } from "react-router-dom";

export function useTable(states: TState[]) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comparePageState = useSelector((store: RootState) => store.comparePage);

  function handleIconClick(
    json: string | undefined,
    state: TState,
    fn: (param?: string) => any
  ) {
    const parsedJson = json && (JSON.parse(json) as TState);
    const parsedNewJson =
      comparePageState.newJson &&
      (JSON.parse(comparePageState.newJson) as TState);

    const parsedOldJson =
      comparePageState.oldJson &&
      (JSON.parse(comparePageState.oldJson) as TState);

    if (parsedJson && _isEqual(state.id, parsedJson.id)) {
      dispatch(fn(undefined));
    } else {
      if (
        (parsedNewJson && _isEqual(state.id, parsedNewJson.id)) ||
        (parsedOldJson && _isEqual(state.id, parsedOldJson.id))
      ) {
        if (comparePageState.newJson && comparePageState.oldJson !== undefined) {
          navigate(`/dashboard/compare-json`);
          console.log(comparePageState)
        }
      } else {
        dispatch(fn(JSON.stringify(state)));
      }
    }
  }

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
        getLongFormatByDate(state.created_at),
      ];
      const actions = [
        {
          icon: handleIcon(comparePageState.oldJson, state)
            ? CheckBox
            : () => <LooksOne />,
          tooltip: "selecionar processo",
          onClick: () => {
            handleIconClick(comparePageState.oldJson, state, setOldJson);
          },
        },
        {
          icon: handleIcon(comparePageState.newJson, state)
            ? CheckBox
            : LooksTwo,
          tooltip: "selecionar processo",
          onClick: () => {
            handleIconClick(comparePageState.newJson, state, setNewJson);
          },
        },
      ];

      const collapseContent = <CollapseContent state={state} />;

      return { items, collapseContent, actions };
    });
  }, [states, comparePageState.oldJson, comparePageState.newJson]);

  return { columnData, rows };
}

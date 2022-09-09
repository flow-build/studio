import React, { useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useCompare } from "pages/history/components/comparison/hooks/useCompare";

import "./json.css";
import { useDispatch } from "react-redux";
import { setNewJson, setOldJson } from "store/slices/compare-page";

import { Section } from "pages/history/components/comparison/components/Section";

import { Action, createBrowserHistory } from "history";

export const Comparison = () => {
  const history = createBrowserHistory();
  const dispatch = useDispatch();
  const compareHook = useCompare();

  const { current, previous } = compareHook.jsonDiff;

  const { getOldJson, getNewJson } = compareHook;

  const clearJson = useCallback(
    (callbackFn: any) => {
      dispatch(callbackFn(undefined));
    },
    [dispatch]
  );

  useEffect(() => {
    const unlisten = history.listen(({ location, action }) => {
      if (action === Action.Pop) {
        clearJson(setOldJson);
        clearJson(setNewJson);
        unlisten();
      }
    });
  }, [clearJson, history]);

  return (
    <Box sx={{ flexGrow: 1 }} height="100%">
      <Grid container columns={12} columnSpacing={6} height="100%">
        <Section
          label="1"
          onClear={() => clearJson(setOldJson)}
          data={previous}
          state={getOldJson}
          onSearch={(json?: any) => dispatch(setOldJson(json))}
        />
        <Section
          label="2"
          onClear={() => clearJson(setNewJson)}
          data={current}
          state={getNewJson}
          onSearch={(json?: any) => dispatch(setNewJson(json))}
        />
      </Grid>
    </Box>
  );
};

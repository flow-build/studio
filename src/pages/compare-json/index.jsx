import React, { useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useCompare } from "pages/compare-json/hooks/useCompare";

import "./json.css";
import { useDispatch } from "react-redux";
import { setNewJson, setOldJson } from "store/slices/compare-page";

import { Section } from "pages/compare-json/components/Section";

import { Action, createBrowserHistory } from "history";

export const CompareJson = () => {
  const history = createBrowserHistory();
  const dispatch = useDispatch();
  const compareHook = useCompare();

  const { current, previous } = compareHook.jsonDiff;

  const { getOldJson, getNewJson } = compareHook;

  const clearJson = useCallback(
    (callbackFn) => {
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
          onSearch={(json) => dispatch(setOldJson(json))}
        />
        <Section
          label="2"
          onClear={() => clearJson(setNewJson)}
          data={current}
          state={getNewJson}
          onSearch={(json) => dispatch(setNewJson(json))}
        />
      </Grid>
    </Box>
  );
};

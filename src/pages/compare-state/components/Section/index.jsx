import React, { useCallback, useState } from "react";

import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import EmptyContent from "pages/compare-state/components/EmptyContent/EmptyContent";

import { Tree } from "pages/compare-state/components/Tree";
import { api } from "services/api";

import { useSelector } from "react-redux";

import * as S from "./styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: "4.5rem",
  marginLeft: "1.1rem",
}));

export const Section = ({
  label = "",
  onClear = () => {},
  onSearch = () => {},
  data = [],
  state,
}) => {
  const processIdHistory = useSelector((state) => state.processId);
  const [payload, setPayload] = useState({
    processId: processIdHistory.processId ?? "",
    step: state?.step_number ?? "",
  });

  const searchState = useCallback(
    async (processId, step) => {
      if (!processId || !step) {
        return;
      }

      const isNumber = (str) => {
        if (typeof str != "string") return false; // we only process strings!
        return !isNaN(str) && !isNaN(parseFloat(str));
      };

      let response;

      if (isNumber(step)) {
        const URL = `/states/process/${processId}?stepNumber=${step}`;
        response = await api.get(URL);
      } else {
        // endpoint = workflowService.endpoints.getStateByNodeId;
        // param = { nodeId: step };
      }

      if (!_isUndefined(response) && !_isUndefined(onSearch)) {
        onSearch(JSON.stringify(response.data));
      }
    },
    [onSearch]
  );

  function backClick() {
    const back = Number(payload.step);
    const newBack = back - 1;

    const newBackPayload = {
      processId: payload.processId,
      step: `${newBack}`,
    };

    setPayload(newBackPayload);
    onSearchPayload(newBackPayload);
  }

  function fowardClick() {
    const foward = Number(payload.step);
    const newFoward = foward + 1;

    const newFowardPayload = {
      processId: payload.processId,
      step: `${newFoward}`,
    };

    setPayload(newFowardPayload);
    onSearchPayload(newFowardPayload);
  }

  function onSearchPayload(data) {
    searchState(data.processId, data.step);
  }

  return (
    <Grid
      item
      xs={6}
      height="100%"
      flex={1}
      style={{ overflowY: _isEmpty(data) ? "hidden" : "auto" }}
    >
      <S.Container>
        <Box
          padding="0.6rem"
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          width="100%"
          color="white"
          zIndex={2}
        >
          <span>{label}</span>
          <S.BackProcessButton onClick={backClick} />
          <TextField
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            label="Process ID"
            variant="outlined"
            value={payload.processId}
            onChange={(event) =>
              setPayload((prev) => ({ ...prev, processId: event.target.value }))
            }
            sx={{}}
          />

          <TextField
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            label="Step"
            variant="outlined"
            value={payload.step}
            onChange={(event) =>
              setPayload((prev) => ({ ...prev, step: event.target.value }))
            }
          />
          <S.FowardProcessButton onClick={fowardClick} />

          <IconButton
            aria-label="search a state"
            onClick={() => onSearchPayload(payload)}
          >
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={onClear}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </S.Container>
      {_isEmpty(data) && <EmptyContent />}

      {!_isEmpty(data) && (
        <Item>
          {data.map((item, index) => (
            <Tree key={index} {...item} />
          ))}
        </Item>
      )}
    </Grid>
  );
};

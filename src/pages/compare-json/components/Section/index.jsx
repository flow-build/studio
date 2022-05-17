import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import _isEmpty from 'lodash/isEmpty';
import _isUndefined from 'lodash/isUndefined';

import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';

import EmptyContent from "pages/compare-json/components/EmptyContent/EmptyContent";

import { workflowService } from "pages/diagram/services/workflowService";

import { Tree } from "pages/compare-json/components/Tree";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Section = ({ label = '', onClear = () => { }, onSearch = () => { }, data = [] }) => {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    processId: '',
    step: '',
  });

  const searchState = useCallback(async (processId, step) => {
    if (!processId || !step) {
      return;
    }

    const isNumber = (str) => {
      if (typeof str != "string") return false; // we only process strings!  
      return !isNaN(str) && !isNaN(parseFloat(str));
    };

    let endpoint;
    let param;

    if (isNumber(step)) {
      endpoint = workflowService.endpoints.getStateByStepNumber;
      param = { stepNumber: step };
    } else {
      endpoint = workflowService.endpoints.getStateByNodeId;
      param = { nodeId: step };
    }

    const response = await dispatch(
      endpoint.initiate({ processId, ...param })
    );

    if (!_isUndefined(response) && !_isUndefined(onSearch)) {
      onSearch(JSON.stringify(response.data));
    }

  }, [dispatch, onSearch]);

  return (
    <Grid item xs={6} height="100%" flex={1} style={{ overflowY: _isEmpty(data) ? 'hidden' : 'auto' }}>
      <Box
        paddingTop='10px'
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        bgColor='#1A2027'
      >
        <span>{label}</span>
        <TextField
          id="outlined-basic"
          label="Process ID"
          variant="outlined"
          value={payload.processId}
          onChange={
            (event) => setPayload(prev => ({ ...prev, processId: event.target.value }))
          }
        />

        <TextField
          id="outlined-basic"
          label="Step"
          variant="outlined"
          value={payload.step}
          onChange={
            (event) => setPayload(prev => ({ ...prev, step: event.target.value }))
          }
        />

        <IconButton
          aria-label="search a state"
          onClick={() => searchState(payload.processId, payload.step)}
        >
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={onClear}>
          <DeleteIcon />
        </IconButton>
      </Box>

      {_isEmpty(data) && <EmptyContent />}

      {!_isEmpty(data) && <Item>
        {data.map((item, index) => (
          <Tree key={index} {...item} />
        ))}
      </Item>}
    </Grid>
  );
};
import React, { useState } from "react";

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import { workflowService } from "services/workflowService";
import { useDispatch } from "react-redux";

import _isUndefined from "lodash/isUndefined";
import { setNewJson, setOldJson } from "features/compare.slice";

const CollapsedTableRow = ({ item }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const saveJSON = async (processId, stepNumber, fn) => {
    try {
      const response = await dispatch(
        workflowService.endpoints.getStateByStepNumber.initiate({ processId, stepNumber })
      );

      if (!_isUndefined(response) && !_isUndefined(fn)) {
        fn(JSON.stringify(response.data));
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
          },
        }}
      >
        <TableCell>
          <IconButton
            size="small"
            aria-label="expand row"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{item.process_id}</TableCell>
        <TableCell>{item.node_id}</TableCell>
        <TableCell>{item.next_node_id || "null"}</TableCell>
        <TableCell>{item.status}</TableCell>
        <TableCell>
          {new Date(item.created_at).toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </TableCell>
        <TableCell>
          <IconButton
            color="primary"
            aria-label="add to json1"
            onClick={() => {
              const fn = (json) => dispatch(setOldJson(json));
              saveJSON(item.process_id, item.step_number, fn);
            }}
          >
            <LooksOneIcon />
          </IconButton>
          <IconButton
            aria-label="add to json2"
            onClick={() => {
              const fn = (json) => dispatch(setNewJson(json));
              saveJSON(item.process_id, item.step_number, fn);
            }}
          >
            <LooksTwoIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      {item?.result && Object.keys(item.result).length > 0 ? (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" component="div">
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" component="p" gutterBottom>
                  Result
                </Typography>
                <Table size="small" aria-label="result">
                  <TableHead>
                    <TableRow>
                      <TableCell>Key</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(item.result).map((key, index) => (
                      <TableRow key={index}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{item.result[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" component="div">
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" component="p" gutterBottom>
                  Result
                </Typography>
                <Typography variant="caption" component="p">
                  No result data...
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CollapsedTableRow;

import React from "react";

import { statusColors } from 'shared/utils/statusColors';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  InputLabel,
  Stack,
  Chip
} from "@mui/material";
import AceEditor from "react-ace";

const ProcessStateDialog = ({ open, onClose, data, onDrawDiagram, onSearchHistory }) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle>Informações do Processo</DialogTitle>
    <DialogContent>
      <DialogContentText>ID: {data?.id}</DialogContentText>
      <DialogContentText>
        Step: {data?.state?.step_number}
      </DialogContentText>
      <DialogContentText>
        <Stack direction="row" spacing={1}>
          <Chip label={data?.current_status} sx={{ background: statusColors[`${data?.current_status}`] }} variant="outlined" />
        </Stack>
      </DialogContentText>
      <InputLabel htmlFor="result_read-only">Result</InputLabel>
      <AceEditor
        value={JSON.stringify(data?.state?.result)}
        mode="javascript"
        theme="github"
        wrapEnabled
        readOnly
      />
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'space-between' }}>
      <Button onClick={onDrawDiagram} variant="outlined">Ver no Diagrama</Button>
      <Button onClick={onSearchHistory} variant="outlined">
        Ver Histórico
      </Button>
    </DialogActions>
  </Dialog>
);

export default ProcessStateDialog;

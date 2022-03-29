import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSearchProcessIdDialog } from "features/bpmnSlice"

import { statusColors } from 'utils/statusColors'

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

const ProcessStateDialog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSearchProcessIdDialogActive, searchProcessIdDialogData] = useSelector(({ bpmn }) => [
    bpmn.isSearchIdDialogActive,
    bpmn.searchProcessIdDialogData
  ])

  const handleOnSearchHistory = () => {
    dispatch(setSearchProcessIdDialog(false))

    navigate(`/history/${searchProcessIdDialogData?.id}`);
  }

  const handleOnDrawDiagram = () => {
    if(!searchProcessIdDialogData.workflow_id) return

    dispatch(setSearchProcessIdDialog(false))

    navigate(`/diagram/${searchProcessIdDialogData.workflow_id}/process/${searchProcessIdDialogData.id}`)
  }

  const handleOnClose = () => dispatch(setSearchProcessIdDialog(false))

  return (
    <Dialog onClose={handleOnClose} open={isSearchProcessIdDialogActive}>
      <DialogTitle>Informações do Processo</DialogTitle>
      <DialogContent>
        <DialogContentText>ID: {searchProcessIdDialogData?.id}</DialogContentText>
        <DialogContentText>
          Step: {searchProcessIdDialogData?.state?.step_number}
        </DialogContentText>
        <Stack direction="row" spacing={1}>
          <Chip label={searchProcessIdDialogData?.current_status} sx={{ background: statusColors[`${searchProcessIdDialogData?.current_status}`]}} variant="outlined" />
        </Stack>
        <InputLabel htmlFor="result_read-only">Result</InputLabel>
        <AceEditor 
          value={JSON.stringify(searchProcessIdDialogData?.state?.result)}
          mode="javascript"
          theme="github"
          wrapEnabled
          readOnly
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Button onClick={handleOnDrawDiagram} variant="outlined">Ver no Diagrama</Button>
        <Button onClick={handleOnSearchHistory} variant="outlined">
          Ver Histórico
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProcessStateDialog;

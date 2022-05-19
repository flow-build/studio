import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSearchProcessIdDialog, setSelectedProcess } from "pages/diagram/features/bpmnSlice";

import { statusColors } from 'pages/diagram/utils/statusColors';

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
import { workflowService } from "pages/diagram/services/workflowService";
import { listWorkflowById } from 'services/resources/workflows/list-by-id';

export const ProcessStateDialog = ({ generateDiagram }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSearchProcessIdDialogActive, searchProcessIdDialogData] = useSelector(({ bpmn }) => [
    bpmn.isSearchIdDialogActive,
    bpmn.searchProcessIdDialogData
  ]);

  const handleOnSearchHistory = () => {
    const workflowId = searchProcessIdDialogData.workflow_id;
    const processId = searchProcessIdDialogData?.id;

    dispatch(setSearchProcessIdDialog(false));

    navigate(`/dashboard/workflows/${workflowId}/processes/${processId}/history`);
  };

  const handleOnDrawDiagram = async () => {
    if (!searchProcessIdDialogData.workflow_id) return;

    dispatch(setSearchProcessIdDialog(false));

    const { data } = await dispatch(workflowService.endpoints.getProcessHistory.initiate(searchProcessIdDialogData.id));
    const orderedData = [...data].reverse();

    await generateDiagram(orderedData);

    dispatch(setSelectedProcess(searchProcessIdDialogData.id));
    // navigate(`/diagram/${searchProcessIdDialogData.workflow_id}/process/${searchProcessIdDialogData.id}`);
  };

  const handleOnClose = () => dispatch(setSearchProcessIdDialog(false));

  const  [workflowName,setWorkflowName] = useState();
  useEffect(() => {  

    const request = async () => {
      if (searchProcessIdDialogData.workflow_id){
        const workflow = await listWorkflowById(
          searchProcessIdDialogData.workflow_id          
        );
        setWorkflowName(workflow.name);
      }    
      
    };

    request();
  }, [searchProcessIdDialogData.workflow_id]);
  
  return (
    <Dialog onClose={handleOnClose} open={isSearchProcessIdDialogActive}>
      <DialogTitle>Informações do Processo</DialogTitle>
      <DialogContent>
        <DialogContentText>ID: {searchProcessIdDialogData?.id}</DialogContentText>
        <DialogContentText>Workflow Name: {workflowName}</DialogContentText>
        <DialogContentText>Node ID: {searchProcessIdDialogData?.state?.node_id}</DialogContentText>
        <DialogContentText>
          Step: {searchProcessIdDialogData?.state?.step_number}
        </DialogContentText>
        <Stack direction="row" spacing={1}>
          <Chip label={searchProcessIdDialogData?.current_status} sx={{ background: statusColors[`${searchProcessIdDialogData?.current_status}`] }} variant="outlined" />
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
  );
};

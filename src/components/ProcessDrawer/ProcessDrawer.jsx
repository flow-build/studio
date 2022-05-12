import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  workflowService,
  useGetWFProcessByIdQuery,
} from "services/workflowService";

import { toggleProcessDrawer, setSelectedProcess } from "features/bpmnSlice";

import { contrastingColor, statusColors } from "utils/statusColors";

import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const ProcessDrawer = ({ modeler }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: processes, isFetching } = useGetWFProcessByIdQuery(id);

  const [isProcessDrawerActive] = useSelector(({ bpmn }) => [
    bpmn.isProcessDrawerActive,
  ]);

  const handleOnClose = () => dispatch(toggleProcessDrawer(false));

  const handleOnSelectProcess = async (processId) => {
    dispatch(toggleProcessDrawer(false));

    try {
      const { data } = await dispatch(
        workflowService.endpoints.getProcessHistory.initiate(processId)
      );
      const orderedData = [...data].reverse();

      const modeling = modeler.get("modeling");
      const elementRegistry = modeler.get("elementRegistry");

      orderedData.forEach((history) => {
        const element = elementRegistry.get(`Node_${history.node_id}`);

        modeling.setColor(element, {
          fill: statusColors[`${history.status}`],
          stroke: contrastingColor(statusColors[`${history.status}`]),
        });
      });

      dispatch(setSelectedProcess(processId));
    } catch (e) {
      console.error(
        `components/ProcessDrawe/handleOnSelectProcess => ${e.error}: ${e.message}`
      );
    }
  };

  return (
    <Drawer anchor="right" open={isProcessDrawerActive} onClose={handleOnClose}>
      {isFetching ? (
        <Box
          sx={{
            width: 320,
            p: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: 320, padding: 1 }} role="presentation">
          <Typography component="p" variant="h6">
            Processos
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography component="p" variant="caption" sx={{ mb: 2 }}>
            Selecione um dos processos parar ver sua representação no diagrama.
          </Typography>
          <List>
            {processes.map((process) => (
              <>
                <ProcessItem
                  process={process}
                  onSelectProcess={handleOnSelectProcess}
                />
                <Divider component="li" />
              </>
            ))}
          </List>
        </Box>
      )}
    </Drawer>
  );
};

const ProcessItem = (props) => {
  const { process, onSelectProcess } = props;

  return (
    <ListItem key={process.id} disableGutters disablePadding>
      <ListItemButton onClick={() => onSelectProcess(process.id)}>
        <ListItemText
          primary={
            <>
              <Typography component="span" variant="body2" color="text.primary">
                {process.id}
              </Typography>
            </>
          }
          secondary={
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                component="span"
                variant="caption"
                color="text.primary"
              >
                {new Date(process.created_at).toLocaleDateString("pt-BR", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <Chip color={process.status} size="small" label={process.status}></Chip>
            </Stack>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ProcessDrawer;

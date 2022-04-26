import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDiagram } from 'pages/workflows/diagram/hooks/useDiagram'
import { workflowService, useGetWFProcessByIdQuery } from 'pages/workflows/diagram/services/workflowService'

import { toggleProcessDrawer, setSelectedProcess } from 'pages/workflows/diagram/features/bpmnSlice'

import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'

export const ProcessDrawer: React.FC<any> = ({ modeler }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { handleDrawOnDiagram } = useDiagram()
  const { data: processes, isFetching } = useGetWFProcessByIdQuery(id)

  const [isProcessDrawerActive] = useSelector(({ bpmn }: any) => [
    bpmn.isProcessDrawerActive
  ])

  const handleOnClose = () => dispatch(toggleProcessDrawer(false))

  const handleOnSelectProcess = async (processId: any) => {
    dispatch(toggleProcessDrawer(false))

    try {
      const { data } = await dispatch<any>(workflowService.endpoints.getProcessHistory.initiate(processId))
      const orderedData = [...data].reverse()

      handleDrawOnDiagram(modeler, orderedData)

      dispatch(setSelectedProcess(processId))

    } catch (e: any) {
      console.error(`components/ProcessDrawe/handleOnSelectProcess => ${e.error}: ${e.message}`)
    }
  }

  return (
    <Drawer
      anchor='right'
      open={isProcessDrawerActive}
      onClose={handleOnClose}
    >
      {
        isFetching ? (
          <Box sx={{
            width: 320,
            p: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }} >
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ width: 320, padding: 1 }} role='presentation'>
            <Typography component="p" variant="h6">Processos</Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography component="p" variant="caption" sx={{ mb: 2 }}>Selecione um dos processos parar ver sua representação no diagrama.</Typography>
            <List>
              {
                processes.map((process: any) => (
                  <React.Fragment key={process.id}>
                    <ListItem disableGutters disablePadding>
                      <ListItemButton onClick={() => handleOnSelectProcess(process.id)}>
                        <ListItemText
                          primary={
                            <>
                              <Typography component="span" variant="body2" color="text.primary">
                                {process.id}
                              </Typography>
                            </>
                          }
                          secondary={
                            <>
                              <Typography component="span" variant="caption" color="text.primary">
                                {new Date(process.created_at).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - {process.status}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))
              }
            </List>
          </Box>
        )
      }
    </Drawer>
  );
};

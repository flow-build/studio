import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useDiagram } from 'pages/diagram/hooks/useDiagram'

import { toggleProcessDrawer } from 'pages/diagram/features/bpmnSlice'

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "pages/diagram/styles/bpmnStyles.css"

import extraPropertiesModeler from 'pages/diagram/bpmn/extraProperties'

import { useGetWorkflowDiagramQuery, useGetWorkflowsQuery } from 'pages/diagram/services/workflowService'

import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
  Stack,
  Grid
} from '@mui/material'
import { ZoomInOutlined, ZoomOutOutlined } from '@mui/icons-material'

import { DrawOnDiagram } from 'pages/diagram/components/draw-on-diagram'
import { DiagramPanel } from 'pages/diagram/components/panel'
import { ProcessDrawer } from 'pages/diagram/components/process-drawer'
import { SidebarSearch } from 'pages/diagram/components/sidebar-search'

export const Diagram = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { handleZoomIn, handleZoomOut, handleOnSaveXML } = useDiagram()
  const theme = useTheme()

  const { data: diagram, isFetching } = useGetWorkflowDiagramQuery(id)

  const { workflow } = useGetWorkflowsQuery(undefined, {
    selectFromResult: ({ data }: any) => ({
      workflow: data?.find((workflow: any) => workflow.workflow_id === id)
    })
  })

  const container = useRef(null)

  const [modeler, setModeler] = useState<any>(null)

  const handleGetWorkflowDiagram = async () => {
    if (isFetching) return

    if (modeler) {
      modeler.destroy()
    }

    const model = extraPropertiesModeler(container.current, {
      bpmnRenderer: {
        defaultFillColor: theme?.palette?.background?.default,
        defaultStrokeColor: theme?.palette?.common?.white
      }
    })

    setModeler(model)

    model.importXML(diagram)
  }

  const handleToggleProcessDrawer = () => dispatch(toggleProcessDrawer(true))

  useEffect(() => {
    handleGetWorkflowDiagram()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, diagram])

  if (isFetching) return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }} >
      <CircularProgress />
    </Box>
  )

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '5px 10px'
        }}
      >
        <Typography variant="h5" component="h2">{workflow?.name || 'Diagrama'}</Typography>
        <Stack direction="row" spacing={1}>
          <SidebarSearch />
          <Tooltip title="Zoom In">
            <Button variant="outlined" onClick={() => handleZoomIn(modeler)}>
              <ZoomInOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Zoom out">
            <Button variant="outlined" onClick={() => handleZoomOut(modeler)}>
              <ZoomOutOutlined />
            </Button>
          </Tooltip>
          <Button variant='contained' onClick={handleToggleProcessDrawer} >Listar Processos</Button>
          <Button variant='contained' onClick={() => handleOnSaveXML(modeler)}>Download XML</Button>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        ref={container}
        sx={{
          height: 'calc(100vh - 140px)',
          position: 'relative'
        }}
      />
      <Grid item xs={12}>
        <DiagramPanel modeler={modeler} />
      </Grid>
      <ProcessDrawer modeler={modeler} />
      <DrawOnDiagram modeler={modeler} />
    </Grid>
  )
}
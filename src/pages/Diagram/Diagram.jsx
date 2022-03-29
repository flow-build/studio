import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

import { toggleProcessDrawer } from 'features/bpmnSlice'

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "assets/styles/bpmnStyles.css"

import extraPropertiesModeler from 'bpmn/extraProperties'

import { useGetWorkflowDiagramQuery, useGetWorkflowsQuery } from 'services/workflowService'

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
import { DiagramPanel, ProcessDrawer } from 'components'

const Diagram = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const theme = useTheme()
    const { data: diagram, isFetching } = useGetWorkflowDiagramQuery(id)
    const { workflow } = useGetWorkflowsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            workflow: data?.find((workflow) => workflow.workflow_id === id)
        })
    })
    console.log('Workflow: ', workflow)
    const container = useRef(null)

    const [modeler, setModeler] = useState(null)

    const handleGetWorkflowDiagram = async () => {
        if(isFetching) return
        
        if(modeler) {
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

    const handleOnSaveXML = async () => {
        const { xml } = await modeler.saveXML()

        if(!xml) return

        const canvas = modeler.get('canvas')
        const blob = new Blob([xml], { type: 'xml' })
        const link = document.createElement('a');

        link.setAttribute('href', URL.createObjectURL(blob))
        link.setAttribute('download', canvas.getRootElement().businessObject['id' || 'name'])

        link.style.display = 'none'

        link.click()
    }

    const handleZoomIn = () => {
        if(!modeler) return

        modeler.get('zoomScroll').stepZoom(1)
    }

    const handleZoomOut = () => {
        if(!modeler) return

        modeler.get('zoomScroll').stepZoom(-1)
    }

    const handleToggleProcessDrawer = () => dispatch(toggleProcessDrawer(true))

    useEffect(() => {
        handleGetWorkflowDiagram()
    }, [id, diagram])

    if(isFetching) return (
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
                    <Tooltip title="Zoom In">
                        <Button variant="outlined" onClick={handleZoomIn}>
                            <ZoomInOutlined />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Zoom out">
                        <Button variant="outlined" onClick={handleZoomOut}>
                            <ZoomOutOutlined />
                        </Button>
                    </Tooltip>
                    <Button variant='contained' onClick={handleToggleProcessDrawer} >Listar Processos</Button>
                    <Button variant='contained' onClick={handleOnSaveXML}>Download XML</Button>
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
            >
                
            </Grid>
            <Grid item xs={12}>
                <DiagramPanel modeler={modeler} />
            </Grid>
            <ProcessDrawer modeler={modeler}/>
        </Grid>
    )
}

export default Diagram
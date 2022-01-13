import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { useGetWorkflowsQuery, workflowService } from 'services/workflowService'

import { 
    Box,
    Card, 
    CardContent, 
    CardActions,
    CircularProgress, 
    Grid, 
    IconButton, 
    Tooltip, 
    Typography
} from '@mui/material'
import { VisibilityOutlined, ExtensionOutlined, AddOutlined } from '@mui/icons-material'

const Workflows = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data: workflows, isFetching } = useGetWorkflowsQuery()

    const handleCreateWorkflow = async (e, name) => {
        e.preventDefault();
        try {
            const { data } = await dispatch(workflowService.endpoints.createWorkflowByName.initiate({ name }))

            navigate(`/history/${data?.process_id}`)
        } catch(e) {
            console.error(`Pages/Workflows/handleCreateWorkflow -> ${e.error}: ${e.message}`)
        }
    }

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
        <Grid container spacing={2}>
            {
                workflows?.map((workflow) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={workflow.workflow_id}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>versão {workflow.version}</Typography>
                                <Typography variant="h5" component="h3">{workflow.name}</Typography>
                                <Typography color="text.secondary" sx={{mb: 2}}>{workflow.workflow_id}</Typography>
                                <Typography variant="body2">{workflow.description}</Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="caption" >{new Date(workflow.created_at).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                                <Box>
                                    <Tooltip title="Ver Processos">
                                        <Link to={`/workflow/${workflow.workflow_id}`} >
                                            <IconButton>
                                                <VisibilityOutlined />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="Novo Processo">
                                        <Link to="" onClick={(e) => handleCreateWorkflow(e, workflow.name)}>
                                            <IconButton>
                                                <AddOutlined />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="Ver Diagrama">
                                        <Link to={`/diagram/${workflow.workflow_id}`} >
                                            <IconButton>
                                                <ExtensionOutlined />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                )).reverse()
            }
        </Grid>
    )
}

export default Workflows
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetWFProcessByIdQuery, useGetWorkflowsQuery } from 'services/workflowService'

import { 
    Box,
    Card, 
    CardContent, 
    CardActions,
    CircularProgress, 
    Grid, 
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip, 
    Typography
} from '@mui/material'
import { VisibilityOutlined, ExtensionOutlined, ViewList, ViewModule } from '@mui/icons-material'

const WorkflowById = () => {
    const [view, setView] = useState('list')
    let { id } = useParams()
    const { data: processes, isFetching } = useGetWFProcessByIdQuery(id)
    const { workflow } = useGetWorkflowsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            workflow: data?.find((workflow) => workflow.workflow_id === id)
        })
    })

    const handleSetView = (event, nextView)  => setView(nextView)

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
            <Grid item xs={12} >
                <Typography variant="h4" component="h1" >Processos - Workflow {workflow?.name}</Typography>
                <Typography variant="caption" component="p" gutterBottom>Workflow ID: {workflow?.workflow_id}</Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center'
                }} >
                    <ToggleButtonGroup value={view} exclusive onChange={handleSetView} >
                        <ToggleButton value="list" aria-label='list'>
                            <ViewList />
                        </ToggleButton>
                        <ToggleButton value="card" aria-label='card'>
                            <ViewModule />    
                        </ToggleButton> 
                    </ToggleButtonGroup>
                </Box>
            </Grid>
            {
                view === 'card' && processes?.length > 0 && processes?.map((process) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={process.id}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{process.status}</Typography>
                                <Typography variant="h5" component="h3">{process.state.node_name}</Typography>
                                <Typography color="text.secondary">{process.id}</Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                <Typography variant="caption" >{new Date(process.created_at).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                                <Box>
                                    <Tooltip title="Ver Histórico">
                                        <Link to={`/history/${process.id}`} >
                                            <IconButton>
                                                <VisibilityOutlined />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="Ver Diagrama">
                                        <Link to="" >
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
            
            {
                view === 'list' && (
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Create At</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        processes?.length > 0 ? processes.map((process) => (
                                            <TableRow key={process.id}>
                                                <TableCell>{process.state.node_name}</TableCell>
                                                <TableCell>{process.id}</TableCell>
                                                <TableCell>{process.status}</TableCell>
                                                <TableCell>{new Date(process.created_at).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                                                <TableCell>
                                                    <Box>
                                                        <Tooltip title="Ver Histórico">
                                                            <Link to={`/history/${process.id}`} >
                                                                <IconButton>
                                                                    <VisibilityOutlined />
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                        <Tooltip title="Ver Diagrama">
                                                            <Link to="" >
                                                                <IconButton>
                                                                    <ExtensionOutlined />
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )).reverse()
                                        : (
                                            <TableRow>
                                                <TableCell colSpan={5}>
                                                    <Typography component="span" variant="caption">Nenhum processo encontrado...</Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )
            }
        </Grid>
    )
}

export default WorkflowById
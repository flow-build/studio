import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetWFProcessByIdQuery } from 'services/workflowService'

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
import { VisibilityOutlined, ExtensionOutlined } from '@mui/icons-material'

const WorkflowById = () => {
    let { id } = useParams()
    const { data: processes, isFetching } = useGetWFProcessByIdQuery(id)

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
                processes?.length > 0 ? processes?.map((process) => (
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
                )).reverse() : (
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" component="p" gutterBottom>Nenhum processo encontrado...</Typography>
                    </Grid>
                )
            }
        </Grid>
    )
}

export default WorkflowById
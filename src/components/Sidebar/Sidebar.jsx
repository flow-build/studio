import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useGetWorkflowsQuery, workflowService } from 'services/workflowService'

import listRoutes from 'routes/listRoutes'

import { 
    Box, 
    Paper, 
    List, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText,
    IconButton,
    Tooltip
} from '@mui/material'
import { VisibilityOutlined, ExtensionOutlined } from '@mui/icons-material'

const Sidebar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { data: workflows } = useGetWorkflowsQuery()

    const active = listRoutes.findIndex(item => item.pathname === location?.pathname)

    const handleCreateWorkflow = async (e, name) => {
        e.preventDefault();
        try {
            const { data } = await dispatch(workflowService.endpoints.createWorkflowByName.initiate({ name }))

            navigate(`/history/${data?.process_id}`)
        } catch(e) {
            console.error(`Components/Sidebar/handleCreateWorkflow -> ${e.error}: ${e.message}`)
        }
    }

    console.log('Active: ', active)
    
    return (
        <Paper
            elevation={0}
            square
        >
            <List
                component="nav"
            >
                {
                    listRoutes.map((route, index) => (
                        <>
                            <Link to={route.pathname} alt={route.name} key={route.pathname}>
                                <ListItemButton
                                    sx={
                                        index === active && [
                                            {
                                                '&': {
                                                    backgroundImage: 'linear-gradient( to right, #2D77EF, #62b4ff)',
                                                    color: '#fff'
                                                },
                                                '& svg': {
                                                    color: '#fff'
                                                }
                                            }
                                        ]
                                    }
                                >
                                    <ListItemIcon>{route.icon}</ListItemIcon>
                                    <ListItemText>{route.name}</ListItemText>
                                </ListItemButton>
                            </Link>
                            {
                                route.pathname === '/workflows' && workflows?.length > 0 && (
                                    <Box>
                                        {
                                            workflows.map(workflow => (
                                                <ListItemButton 
                                                    key={workflow.workflow_id} 
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <Link to={`/workflow/${workflow?.workflow_id}`} alt={workflow?.name}>
                                                        <ListItemText>{workflow.name}</ListItemText>
                                                    </Link>
                                                    <Box>
                                                        <Tooltip title="Novo Processo">
                                                            <Link to="" alt="Novo Processo" onClick={(e) => handleCreateWorkflow(e, workflow.name) }>
                                                                <IconButton>
                                                                    <VisibilityOutlined fontSize='small'/>
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                        <Tooltip title="Ver Diagrama">
                                                            <Link to={`/diagram/${workflow.workflow_id}`} alt="Ver Diagrama">
                                                                <IconButton>
                                                                    <ExtensionOutlined fontSize='small'/>
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                    </Box>
                                                </ListItemButton>
                                            ))
                                        }
                                    </Box>
                                )
                            }
                        </>
                    ))
                }
            </List>
        </Paper>
    )
}

export default Sidebar
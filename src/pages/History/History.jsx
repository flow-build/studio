import { ViewList, ViewModule } from '@mui/icons-material'
import {
	Alert,
	Box,
	Card, CardActions, CardContent, Chip,
	CircularProgress,
	Grid,
	Paper,
	Stack,
	Table, TableBody, TableCell, TableContainer,
	TableHead,
	TableRow, ToggleButton,
	ToggleButtonGroup,
	Typography
} from '@mui/material'
import { CollapsedTableRow } from 'components'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProcessHistoryQuery } from 'services/workflowService'




const History = () => {
    const [view, setView] = useState('list')

    let { id } = useParams()
    const { data: history, isFetching } = useGetProcessHistoryQuery(id)

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
                <Typography variant="h4" component="h1" >Histórico</Typography>
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
                view === 'card' && history?.length > 0 && history?.map((item) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={item.id}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>{item.status}</Typography>
                                <Typography variant="subtitle1" component="h3">ID do Processo: {item.process_id}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>ID: {item.id}</Typography>
                                <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2 }}>
                                    <Chip label={`Nó Atual: ${item.node_id}`} />
                                    <Chip label={`Proximo Nó: ${item.next_node_id}`} variant="outlined" />
                                </Stack>
                                {
                                    item?.error && <Alert severity="error">{item?.error}</Alert>
                                }

                                {
                                    item?.result && Object.keys(item?.result).length > 0 && (
                                        <TableContainer component={Box}>
                                            <Typography variant="h6" component="p" gutterBottom>Result</Typography>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Chave</TableCell>
                                                        <TableCell>Valor</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        Object.keys(item.result).map((key, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{key}</TableCell>
                                                                <TableCell>{item.result[key]}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    )
                                }
                            </CardContent>
                            <CardActions>
                                <Typography variant="caption" component="p">
                                    {new Date(item.created_at).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </Typography>
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
                                        <TableCell />
                                        <TableCell>ID</TableCell>
                                        <TableCell>Node</TableCell>
                                        <TableCell>Next Node</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Create At</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        history?.length > 0 && history.map((item, index) => (
                                            <CollapsedTableRow item={item} key={index} />
                                        )).reverse()
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

export default History
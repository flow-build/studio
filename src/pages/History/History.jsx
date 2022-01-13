import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetProcessHistoryQuery } from 'services/workflowService'

import { 
    Alert,
    Box, 
    Card, 
    CardContent, 
    CardActions, 
    Chip, 
    CircularProgress, 
    Grid,
    Stack,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody, 
    Typography
} from '@mui/material'

const History = () => {
    let { id } = useParams()
    const { data: history, isFetching } = useGetProcessHistoryQuery(id)
    
    console.log('Process History: ', history)

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
                history?.length > 0 ? history?.map((item) => (
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
                                    item.error && <Alert severity="error">{item.error}</Alert>
                                }

                                {
                                    Object.keys(item.result).length > 0 && (
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
                )).reverse() : (
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" component="p" gutterBottom>Nenhum histórico encontrado</Typography>
                    </Grid>
                )
            }
        </Grid>
    )
}

export default History
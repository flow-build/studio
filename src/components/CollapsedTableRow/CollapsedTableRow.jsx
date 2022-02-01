import React, { useState } from 'react';

import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

const CollapsedTableRow = ({ item }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <TableRow
                sx={{ 
                    '& > *': { 
                            borderBottom: 'unset' 
                        }
                }}
            >
                <TableCell>
                    <IconButton
                        size='small'
                        aria-label='expand row'
                        onClick={() => setOpen(!open)}
                    >
                        {
                            open ? <KeyboardArrowUp /> : <KeyboardArrowDown/>
                        }
                    </IconButton>
                </TableCell>
                <TableCell>{item.process_id}</TableCell>
                <TableCell>{item.node_id}</TableCell>
                <TableCell>{item.next_node_id || "null"}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
            </TableRow>
            {
                item?.result && Object.keys(item.result).length > 0 ? (
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" component="div" >
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6" component="p" gutterBottom>Result</Typography> 
                                    <Table size='small' aria-label='result'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Key</TableCell>
                                                <TableCell>Value</TableCell>
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
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                ) : (
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" component="div">
                                <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6" component="p" gutterBottom >Result</Typography>
                                    <Typography variant='caption' component='p'>No result data...</Typography>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                )
            }
        </>
    )
};

export default CollapsedTableRow;

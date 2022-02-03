import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggleDrawer } from 'features/bpmnSlice'

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

const PropertiesDrawer = ({ isOpen, onSelectItem }) => {
    const dispatch = useDispatch()

    const [properties] = useSelector(({ bpmn }) => [
        bpmn.propertiesDrawer
    ])

    const handleOnSelectItem = (item) => {
        onSelectItem(item)
        dispatch(toggleDrawer(false))
    }

    return (
        <Drawer
            anchor='right'
            open={isOpen}
            onClose={() => dispatch(toggleDrawer(false))}
        >   
            <Box
                sx={{ width: 320, padding: 1 }}
                role="presentation"
            >
                <Typography component="p" variant="h6">Propriedades</Typography>
                <Divider sx={{ mb: 1 }}/>
                <Typography component="p" variant="caption" sx={{mb: 2}}>Ao selecionar uma das opções pré definidas os valores serão automaticamente preenchidos.</Typography>
                {
                    properties.map((property, index) => (
                        <Accordion key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                            >
                                <Typography>Properties {index}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List dense>
                                    {
                                        Object.keys(property).map((key, index) => (
                                            <ListItem key={index} disableGutters disablePadding>
                                                <ListItemText primary={key} secondary={JSON.stringify(property[key])} />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Button variant='text' onClick={() => handleOnSelectItem(property)}>Selecionar</Button>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </Box>
        </Drawer>
    );
};

export default PropertiesDrawer;

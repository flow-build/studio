import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggleDrawer } from 'features/bpmnSlice'

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button,
    Divider,
    Drawer,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    OutlinedInput,
    Typography
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

const PropertiesDrawer = ({ isOpen, onSelectItem }) => {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState(null)

    const properties = useSelector(({ bpmn }) => {
        if(!filter) return bpmn.propertiesDrawer

        return bpmn.propertiesDrawer.filter((property) => 
            property.spec.toLowerCase().includes(filter.toLowerCase()) ||
            property.name.toLowerCase().includes(filter.toLowerCase()) ||
            property?.category?.toLowerCase()?.includes(filter.toLowerCase())
        )
    })

    const handleOnSelectItem = (item) => {
        onSelectItem(item)
        dispatch(toggleDrawer(false))
    }

    const handleSearchProperties = (event) => setFilter(event.target.value)

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
                <FormControl fullWidth variant='outlined' sx={{mb: 2}}>
                    <InputLabel htmlFor='properties-search'>Pesquisar</InputLabel>
                    <OutlinedInput
                        type='text'
                        id='properties-search'
                        label='Pesquisar'
                        onChange={handleSearchProperties}
                    />
                </FormControl>
                {
                    properties?.map((property, index) => (
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

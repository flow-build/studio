import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggleDrawer } from 'pages/dashboard/workflows/diagram/features/bpmnSlice'

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

export const PropertiesDrawer: React.FC<any> = ({ isOpen, onSelectItem }) => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState<any>(null)

  const properties = useSelector(({ bpmn }: any) => {
    if (!filter) return bpmn.propertiesDrawer

    return bpmn.propertiesDrawer.filter((property: any) =>
      property.spec.toLowerCase().includes(filter.toLowerCase()) ||
      property.name.toLowerCase().includes(filter.toLowerCase()) ||
      property?.category?.toLowerCase()?.includes(filter.toLowerCase())
    )
  })

  const handleOnSelectItem = (item: any) => {
    onSelectItem(item)
    dispatch(toggleDrawer(false))
  }

  const handleSearchProperties = (event: any) => setFilter(event.target.value)

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
        <Divider sx={{ mb: 1 }} />
        <Typography component="p" variant="caption" sx={{ mb: 2 }}>Ao selecionar uma das opções pré definidas os valores serão automaticamente preenchidos.</Typography>
        <FormControl fullWidth variant='outlined' sx={{ mb: 2 }}>
          <InputLabel htmlFor='properties-search'>Pesquisar</InputLabel>
          <OutlinedInput
            type='text'
            id='properties-search'
            label='Pesquisar'
            onChange={handleSearchProperties}
          />
        </FormControl>
        {
          properties?.map((property: any, index: any) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
              >
                <Typography>{property.spec}</Typography>
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

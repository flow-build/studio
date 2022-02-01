import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { is } from 'bpmn-js/lib/util/ModelUtil'

import AceEditor from "react-ace";
import { Typography, TextField, Box, Grid, InputLabel, FormControl  } from "@mui/material"
import { PropertiesDrawer } from 'components'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const DiagramPanel = ({ modeler }) => {
    const [element, setElement] = useState(null)

    const [isDrawerActive] = useSelector(({ bpmn }) => [
        bpmn.isDrawerActive
    ])

    const handleUpdateElement = (event) => {
        const { name, value } = event.target
        const modeling = modeler.get('modeling');

        modeling.updateProperties(element, {
            [name]: value
        })
    }

    const handleCodeEditorChanges = (value) => {
        const modeling = modeler.get('modeling');

        modeling.updateProperties(element, {
            'custom:parameters': value
        })
    }

    const handleOnSelectItem = (items) => {
        if(!items) return

        const modeling = modeler.get('modeling')

        Object.keys(items).forEach((key) => {
            modeling.updateProperties(element, {
                [`custom:${key}`]: key === 'parameters' ? JSON.stringify(items[key]) : items[key]
            })
        })
    }

    useEffect(() => {
        if(!modeler) return

        modeler.on('selection.changed', (e) => {
            if(!e.newSelection[0]) return

            setElement(e.newSelection[0])
        })

        modeler.on('element.changed', (e) => {
            setElement(e.element)
        })

    }, [modeler])

    if(!element) return <></>

    return (
        <Box
            sx={{
                padding: '10px',
                width: '100%'
            }}
        >
            <Typography variant="h6" component="h4" gutterBottom >Painel de Propriedades</Typography>
            <Grid container key={element.id} spacing={2}>
                {
                   is(element, 'custom:WorkflowInfo') && (
                       <>
                            <Grid item xs={12} md={6} lg={12}>
                                <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                                    <TextField 
                                        label="Lane ID"
                                        size="small"
                                        name="custom:lane_id"
                                        onChange={handleUpdateElement}
                                        defaultValue={element.businessObject.get('custom:lane_id')}
                                    />
                                </FormControl>
                                
                                <FormControl fullWidth variant="standard">
                                    <TextField
                                        label="Category"
                                        size="small"
                                        name="custom:category"
                                        defaultValue={element.businessObject.get('custom:category')}
                                        onChange={handleUpdateElement}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6} lg={12}>
                                <Box sx={{ mb: 2 }}>
                                    <InputLabel htmlFor='custom:parameters' sx={{ mb: 1 }}>Parameters</InputLabel >
                                    <AceEditor 
                                        value={element?.businessObject.get('custom:parameters')}
                                        mode="javascript"
                                        theme='github'
                                        name="custom:parameters" 
                                        onChange={handleCodeEditorChanges} 
                                        showPrintMargin={true}
                                        showGutter={true}
                                        highlightActiveLine={true}
                                    />
                                </Box>
                            </Grid>
                       </>
                   ) 
                }

                {
                    is(element, 'custom:WorkflowLane') && (
                        <>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="standard">
                                    <TextField 
                                        label="Rule"
                                        size="small"
                                        name="custom:rule"
                                        defaultValue={element.businessObject.get('custom:rule')}
                                        onChange={handleUpdateElement}
                                    />
                                </FormControl>
                            </Grid>
                        </>
                    )
                }

                <PropertiesDrawer isOpen={isDrawerActive} onSelectItem={handleOnSelectItem} />    
            </Grid>
        </Box>
    )
}

export default DiagramPanel
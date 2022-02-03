import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { is } from 'bpmn-js/lib/util/ModelUtil'

import { setPropertiesDrawerItems, toggleDrawer } from 'features/bpmnSlice'
import { bpmnService } from 'services/bpmnService'

import AceEditor from "react-ace";
import { Typography, TextField, Box, Button, InputLabel, FormControl, Drawer  } from "@mui/material"
import { PropertiesDrawer } from 'components'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const DiagramPanel = ({ modeler }) => {
    const dispatch = useDispatch()
    
    const [element, setElement] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

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

        setIsOpen(true)
    }

    const handleOnClose = () => setIsOpen(false)

    const handleGetProperties = async () => {
        try {
            setIsOpen(false)
            dispatch(toggleDrawer(true))
            const string = element.type.split(':')[1]
            const { data } = await dispatch(bpmnService.endpoints.getProperties.initiate(string.toLowerCase()))

            dispatch(setPropertiesDrawerItems(data?.items))
        } catch(e) {
            console.error(`PropertiesControlPad/handleGetProperties => ${e.error}: ${e.message}`)
        }
    }

    useEffect(() => {
        if(!modeler) return

        modeler.on('selection.changed', (e) => {
            if(!e.newSelection[0]) return
            
            setElement(e.newSelection[0])
            setIsOpen(true)
        })

        modeler.on('element.changed', (e) => {
            setElement(e.element)
        })

    }, [modeler])

    if(!element) return <></>

    return (
        <>
            <Drawer 
                anchor='right'
                open={isOpen}
                onClose={handleOnClose}
            >
                <Box
                    role='presentation'
                    sx={{ width: 320, padding: 1}}
                >
                    <Typography variant="h6" component="h4" gutterBottom >Painel de Propriedades</Typography>
                    {
                        is(element, 'custom:WorkflowInfo') && (
                            <>
                                <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                                    <TextField 
                                        label="Spec"
                                        size="small"
                                        name="custom:spec"
                                        onChange={handleUpdateElement}
                                        defaultValue={element.businessObject.get('custom:spec')}
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

                                <Box sx={{ mt: 2, mb: 2}}>
                                    <InputLabel htmlFor='custom:parameters' sx={{ mb: 1 }}>Parameters</InputLabel >
                                    <AceEditor 
                                        value={element?.businessObject.get('custom:parameters')}
                                        mode="javascript"
                                        theme='github'
                                        name="custom:parameters" 
                                        width="100%"
                                        onChange={handleCodeEditorChanges} 
                                        showPrintMargin={true}
                                        showGutter={true}
                                        highlightActiveLine={true}
                                        wrapEnabled={true}
                                        editorProps={{ $blockScrolling: true }}
                                        setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true
                                        }}
                                    />
                                </Box>
                            </>
                        )
                    }

                    {
                        is(element, 'custom:WorkflowLane') && (
                            <FormControl fullWidth variant="standard">
                                <TextField 
                                    label="Rule"
                                    size="small"
                                    name="custom:rule"
                                    defaultValue={element.businessObject.get('custom:rule')}
                                    onChange={handleUpdateElement}
                                />
                            </FormControl>
                        )
                    }
                    <Button variant='contained' fullWidth onClick={handleGetProperties} >Propriedades Customizadas</Button>
                </Box>
            </Drawer>
            <PropertiesDrawer isOpen={isDrawerActive} onSelectItem={handleOnSelectItem} /> 
        </>
    )
}

export default DiagramPanel
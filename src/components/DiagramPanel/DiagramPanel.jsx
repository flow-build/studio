import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { is } from 'bpmn-js/lib/util/ModelUtil'
import _ from 'lodash'

import { setPropertiesDrawerItems, toggleDrawer } from 'features/bpmnSlice'
import { bpmnService } from 'services/bpmnService'

import AceEditor from "react-ace";
import { 
    Typography, 
    TextField, 
    Box, 
    Button, 
    InputLabel, 
    FormControl, 
    Drawer, 
    Dialog, 
    DialogTitle, 
    List,
    ListItem, 
    ListItemText
} from "@mui/material"
import { PropertiesDrawer } from 'components'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const DiagramPanel = ({ modeler }) => {
    const dispatch = useDispatch()
    
    const [element, setElement] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isParametersModalActive, setIsParametersModalActive] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState([])

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

        if(items['category']) 
            modeling.updateProperties(element, {
                [`custom:category`]: items['category']
            })

        if(items['spec'])
            modeling.updateProperties(element,  {
                [`custom:spec`]: items['spec']
            })

        if(items['parameters']) {
            if(Boolean(element.businessObject.get('custom:parameters'))) {
                setSelectedProperty(items)
                setIsParametersModalActive(true)
            } else {
                modeling.updateProperties(element, {
                    [`custom:parameters`]: JSON.stringify(items['parameters'])
                })
            }
                
        }

        if(!element.businessObject.get('name')) {
            modeling.updateLabel(element, items['name'])
        }

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

    const handleMergePropertyValues = (value) => {
        const modeling = modeler.get('modeling')

        modeling.updateProperties(element, {
            [`custom:parameters`]: JSON.stringify(_.merge(
                JSON.parse(element.businessObject.get('custom:parameters')),
                value
            ))
        })
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

    console.log('Element: ', element)

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
            <Dialog onClose={() => setIsParametersModalActive(false)} open={isParametersModalActive}>
                <DialogTitle>Escolha uma Opção</DialogTitle>
                <List sx={{ pt: 0 }}>
                    <ListItem button onClick={() => {
                        handleCodeEditorChanges(JSON.stringify(selectedProperty?.parameters))
                        setIsParametersModalActive(false)
                    }}>
                        <ListItemText primary='Substituir valores antigos pelos novos.' />
                    </ListItem>
                    <ListItem button onClick={() => setIsParametersModalActive(false)}>
                        <ListItemText primary='Manter os valores atuais.' />
                    </ListItem>
                    <ListItem button onClick={() => {
                        handleMergePropertyValues(selectedProperty.parameters)
                        setIsParametersModalActive(false)
                    }}>
                        <ListItemText primary='Mesclar os valores antigos com os novos.' />
                    </ListItem>
                </List>
            </Dialog>
        </>
    )
}

export default DiagramPanel
import React from 'react'
import { is } from 'bpmn-js/lib/util/ModelUtil'

import * as S from './styles'

const DiagramProperties = ({ modeler, element }) => {

    // const append = (element, attrs) => {
    //     const autoPlace = modeler.get('autoPlace');
    //     const elementFactory = modeler.get('elementFactory');

    //     return autoPlace.append(element, elementFactory.createShape(attrs))
    // }

    const handleUpdateName = (name) => {
        const modeling = modeler.get('modeling');
        modeling.updateLabel(element, name);
    }

    const handleUpdateElement = ({ name, value}) => {
        const modeling = modeler.get('modeling');

        modeling.updateProperties(element, {
            [name]: value
        })
    }

    // const handleUpdateTopic = (topic) => {
    //     const modeling = modeler.get('modeling');

    //     modeling.updateProperties(element, {
    //         'custom:topic': topic
    //     });
    // }

    // const makeMessageEvent = () => {
    //     const bpmnReplace = modeler.get('bpmnReplace');

    //     bpmnReplace.replaceElement(element, {
    //         type: element?.businessObject.$type,
    //         eventDefinitionType: 'bpmn:MessageEventDefinition'
    //     });
    // }

    // const makeServiceTask = () => {
    //     const bpmnReplace = modeler.get('bpmnReplace')

    //     bpmnReplace.replaceElement(element, {
    //         type: 'bpmn:ServiceTask'
    //     });
    // }

    // const attachTimeout = () => {
    //     const modeling = modeler.get('modeling');
    //     const selection = modeler.get('selection');

    //     const attrs = {
    //         type: 'bpmn:BoundaryEvent',
    //         eventDefinitionType: 'bpmn:TimerEventDefinition'
    //     };

    //     const position = {
    //         x: element?.x + element?.width,
    //         y: element?.y + element?.height
    //     };

    //     const boundaryEvent = modeling.createShape(attrs, position, element, { attach: true })

    //     const taskShape = append(boundaryEvent, {
    //         type: 'bpmn:Task'
    //     });

    //     selection.select(taskShape);
    // }

    // const isTimeoutConfigured = (element) => {
    //     const attachers = element.attachers || [];

    //     return attachers.some(e => hasDefinition(e, 'bpmn:TimerEventDefinition'))
    // }

    return (
        <S.DiagramProperties >
            <fieldset>
                <label>id</label>
                <span>{element?.id}</span>
            </fieldset>

            <fieldset>
                <label>name</label>
                <input value={element?.businessObject.name || ''} onChange={(event) => handleUpdateName(event.target.value)} />
            </fieldset>

            {
                is(element, 'custom:WorkflowInfo') && (
                    <React.Fragment>
                        <fieldset>
                            <label>Node Name: </label>
                            <input value={element?.businessObject.get('custom:node_name')} name="custom:node_name" onChange={(event) => handleUpdateElement(event.target)} />
                        </fieldset>

                        <fieldset>
                            <label>Lane ID: </label>
                            <input value={element?.businessObject.get('custom:lane_id')} name="custom:lane_id" onChange={(event) => handleUpdateElement(event.target)} />
                        </fieldset>

                        <fieldset>
                            <label>Category: </label>
                            <input value={element?.businessObject.get('custom:category')} name="custom:category" onChange={(event) => handleUpdateElement(event.target)} />
                        </fieldset>

                        <fieldset>
                            <label>Parameters: </label>
                            <input value={element?.businessObject.get('custom:parameters')} name="custom:parameters" onChange={(event) => handleUpdateElement(event.target)} />
                        </fieldset>
                    </React.Fragment>
                )
            }

        </S.DiagramProperties>
    )
}

export default DiagramProperties
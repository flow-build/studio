import Modeler from "bpmn-js/lib/Modeler"

import OverrideContextPad from "./OverrideContextPad"
import AppendEndEventContextPad from './AppendEndEventContextPad'
import AppendTimerNodeContextPad from './AppendTimerNodeContextPad'
import AppendFlowNodeContextPad from './AppendFlowNodeContextPad'
import AppendUserTaskContextPad from "./AppendUserTaskContextPad"
import AppendServiceTaskContextPad from "./AppendServiceTaskContextPad"
import AppendSubProcessContextPad from './AppendSubProcessContextPad'
import AppendProcessContextPad from './AppendProcessContextPad'
import ChangeElementTypeContextPad from './ChangeElementTypeContextPad'
import RemoveElementContextPad from './RemoveElementContextPad'
import ConnectElementContextPad from './ConnectElementContextPad'
import PropertiesControlPad from './PropertiesControlPad'

const extraPropertiesModeler = (container, options) => {
    return new Modeler({
        container: container,
        moddleExtensions: {
            custom: {
                "name": "extraProperties",
                "uri": "http://extraproperties/ns",
                "types": [
                    {
                        "name": "WorkflowInfo",
                        "extends": [
                            "bpmn:ServiceTask",
                            "bpmn:UserTask",
                            "bpmn:StartEvent",
                            "bpmn:EndEvent",
                            "bpmn:ExclusiveGateway"
                        ],
                        "properties": [
                            {
                                "name": "spec",
                                "isAttr": true,
                                "type": "String"
                            },
                            {
                                "name": "category",
                                "isAttr": true,
                                "type": "String"
                            },
                            {
                                "name": "parameters",
                                "isAttr": true,
                                "type": "String"
                            }
                        ]
                    },
                    {
                        "name": "WorkflowLane",
                        "extends": [
                            "bpmn:Lane"
                        ],
                        "properties": [
                            {
                            "name": "rule",
                            "isAttr": true,
                            "type": "String"
                            }
                        ]
                    }
                ],
                "prefix": "custom",
                "xml": {
                    "tagAlias": "lowerCase"
                }
            }
        },
        keyboard: {
            bindTo: document.body
        },
        additionalModules: [
            {
                __init__: [
                    'contextPadProvider', 
                    'appendEndEventContextPad',
                    'appendTimerNodeContextPad',
                    'appendFlowNodeContextPad',
                    'appendUserTaskContextPad', 
                    'appendServiceTaskContextPad',
                    'appendSubProcessContextPad',
                    'appendProcessContextPad',
                    'changeElementTypeContextPad',
                    'removeElementContextPad',
                    'connectElementContextPad',
                    'propertiesControlPad'
                ],
                contextPadProvider: ['type', OverrideContextPad],
                appendEndEventContextPad: ['type', AppendEndEventContextPad],
                appendTimerNodeContextPad: ['type', AppendTimerNodeContextPad],
                appendFlowNodeContextPad: ['type', AppendFlowNodeContextPad],
                appendUserTaskContextPad: ['type', AppendUserTaskContextPad],
                appendServiceTaskContextPad: ['type', AppendServiceTaskContextPad],
                appendSubProcessContextPad: ['type', AppendSubProcessContextPad],
                appendProcessContextPad: ['type', AppendProcessContextPad],
                changeElementTypeContextPad: ['type', ChangeElementTypeContextPad],
                removeElementContextPad: ['type', RemoveElementContextPad],
                connectElementContextPad: ['type', ConnectElementContextPad],
                propertiesControlPad: ['type', PropertiesControlPad]
            }
        ],
        ...options
    })
}

export default extraPropertiesModeler
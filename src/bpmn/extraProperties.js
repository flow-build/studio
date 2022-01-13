import Modeler from "bpmn-js/lib/Modeler"

const extraPropertiesModeler = (container) => {
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
                            "name": "lane_id",
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
        }
    })
}

export default extraPropertiesModeler
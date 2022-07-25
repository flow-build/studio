import { store } from "store/index";

import { isAny } from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import { setShowPropertiesDialog } from "store/slices/diagram";

export default class Properties {
  constructor(config, contextPad, create, elementFactory, injector, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    async function handleGetProperties(event, element) {
      store.dispatch(
        setShowPropertiesDialog({ isVisible: true, data: { element } })
      );
    }

    if (
      isAny(element.businessObject, [
        "bpmn:EndEvent",
        "bpmn:ExclusiveGateway",
        "bpmn:CallActivity",
        "bpmn:ServiceTask",
        "bpmn:SubProcess",
        "bpmn:IntermediateThrowEvent",
        "bpmn:UserTask",
        "",
      ])
    ) {
      return {
        "handle.get-properties": {
          group: "model",
          className: "bpmn-icon-sequential-mi-marker",
          title: this.translate("Get Properties"),
          action: {
            click: handleGetProperties,
          },
        },
      };
    }
  }
}

Properties.$inject = [
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];

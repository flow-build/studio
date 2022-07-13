import { is } from "bpmn-js/lib/util/ModelUtil";
import { isAny } from "bpmn-js/lib/features/modeling/util/ModelingUtil";

export default class ConnectElement {
  constructor(contextPad, connect, translate) {
    this.translate = translate;
    this.connect = connect;

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const { connect, translate } = this;

    function connectElement(event, element) {
      connect.start(event, element);
    }

    if (
      isAny(element.businessObject, [
        "bpmn:FlowNode",
        "bpmn:InteractionNode",
        "bpmn:DataObjectReference",
        "bpmn:DataStoreReference",
      ])
    ) {
      return {
        "connect-element": {
          group: "utils",
          className: "bpmn-icon-connection-multi",
          title: translate(
            "Connect using " +
              (element.businessObject.isForCompensation
                ? ""
                : "Sequence/MessageFlow or ") +
              "Association"
          ),
          action: {
            click: connectElement,
            dragstart: connectElement,
          },
        },
      };
    }

    if (is(element.businessObject, "bpmn:TextAnnotation")) {
      return {
        "connect-element": {
          group: "utils",
          className: "bpmn-icon-connection-multi",
          title: translate("Connect using Association"),
          action: {
            click: connectElement,
            dragstart: connectElement,
          },
        },
      };
    }

    if (
      isAny(element.businessObject, [
        "bpmn:DataObjectReference",
        "bpmn:DataStoreReference",
      ])
    ) {
      return {
        "connect-element": {
          group: "utils",
          className: "bpmn-icon-connection-multi",
          title: translate("Connect using DataInputAssociation"),
          action: {
            click: connectElement,
            dragstart: connectElement,
          },
        },
      };
    }
  }
}

ConnectElement.$inject = ["contextPad", "connect", "translate"];

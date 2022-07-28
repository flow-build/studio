export default class Flow {
  constructor(config, contextPad, create, elementFactory, injector, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get("autoPlace", false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const { autoPlace, create, elementFactory, translate } = this;

    function appendFlowNode(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({
          type: "bpmn:ExclusiveGateway",
        });

        autoPlace.append(element, shape);
      } else {
        appendFlowNodeStart(event, element);
      }
    }

    function appendFlowNodeStart(event) {
      const shape = elementFactory.createShape({
        type: "bpmn:ExclusiveGateway",
      });

      create.start(event, shape, element);
    }

    return {
      "append.flow-node": {
        group: "model",
        className: "bpmn-icon-gateway-xor",
        title: translate("Append FlowNode"),
        action: {
          click: appendFlowNode,
          dragstart: appendFlowNodeStart,
        },
      },
    };
  }
}

Flow.$inject = [
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];

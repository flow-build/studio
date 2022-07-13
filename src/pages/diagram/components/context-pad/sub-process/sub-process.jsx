export default class SubProcess {
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

    function appendSubProcess(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({ type: "bpmn:SubProcess" });

        autoPlace.append(element, shape);
      } else {
        appendSubProcessStart(event, element);
      }
    }

    function appendSubProcessStart(event) {
      const shape = elementFactory.createShape({ type: "bpmn:SubProcess" });

      create.start(event, shape, element);
    }

    return {
      "append.sub-process": {
        group: "model",
        className: "bpmn-icon-sub-process-marker",
        title: translate("Append SubProcess"),
        action: {
          click: appendSubProcess,
          dragstart: appendSubProcessStart,
        },
      },
    };
  }
}

SubProcess.$inject = [
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];

/**
 * BPMN ICON FONT @see https://cdn.staticaly.com/gh/bpmn-io/bpmn-font/master/dist/demo.html
 */

export default class Timer {
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

    function appendTimerNode(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({
          type: "bpmn:IntermediateThrowEvent",
        });

        autoPlace.append(element, shape);
      } else {
        appendTimerNodeStart(event);
      }
    }

    function appendTimerNodeStart(event) {
      const shape = elementFactory.createShape({
        type: "bpmn:IntermediateThrowEvent",
      });

      create.start(event, shape, element);
    }

    return {
      "append.timer-node": {
        group: "model",
        className: "bpmn-icon-intermediate-event-catch-non-interrupting-timer",
        title: translate("Append TimerNode"),
        action: {
          click: appendTimerNode,
          dragstart: appendTimerNodeStart,
        },
      },
    };
  }
}

Timer.$inject = [
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];

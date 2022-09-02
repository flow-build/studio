/**
 * Since default context pad was overrided, this class add the capability to add UserTask through context pad
 * @see https://github.com/bpmn-io/bpmn-js-example-custom-controls
 */
export default class UserTask {
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

    function appendUserTask(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({ type: "bpmn:UserTask" });

        autoPlace.append(element, shape);
      } else {
        appendUserTaskStart(event);
      }
    }

    function appendUserTaskStart(event) {
      const shape = elementFactory.createShape({ type: "bpmn:UserTask" });

      create.start(event, shape, element);
    }

    return {
      "append.user-task": {
        group: "model",
        className: "bpmn-icon-user-task",
        title: translate("Append UserTask"),
        action: {
          click: appendUserTask,
          dragstart: appendUserTaskStart,
        },
      },
    };
  }
}

UserTask.$inject = [
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];

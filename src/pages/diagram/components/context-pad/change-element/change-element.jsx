/**
 * Context Provider @see https://github.com/bpmn-io/bpmn-js/blob/develop/lib/features/context-pad/ContextPadProvider.js
 */
export default class ChangeElement {
  constructor(contextPad, canvas, popupMenu, translate) {
    this.popupMenu = popupMenu;
    this.translate = translate;
    this.canvas = canvas;
    this.contextPad = contextPad;

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const { contextPad, canvas, translate, popupMenu } = this;

    function getReplaceMenuPosition(element) {
      const Y_OFFSET = 5;
      const diagramContainer = canvas.getContainer();
      const pad = contextPad.getPad(element).html;

      const diagramRect = diagramContainer.getBoundingClientRect();
      const padRect = pad.getBoundingClientRect();

      const top = padRect.top - diagramRect.top;
      const left = padRect.left - diagramRect.left;

      const pos = {
        x: left,
        y: top + padRect.height + Y_OFFSET,
      };

      return pos;
    }

    function onChangeElementType(event, element) {
      const position = Object.assign(getReplaceMenuPosition(element), {
        cursor: {
          x: event.x,
          y: event.y,
        },
      });

      popupMenu.open(element, "bpmn-replace", position);
    }

    if (!popupMenu.isEmpty(element, "bpmn-replace")) {
      return {
        "replace.element-type": {
          group: "utils",
          className: "bpmn-icon-screw-wrench",
          title: translate("Change Type"),
          action: {
            click: onChangeElementType,
          },
        },
      };
    }
  }
}

ChangeElement.$inject = ["contextPad", "canvas", "popupMenu", "translate"];

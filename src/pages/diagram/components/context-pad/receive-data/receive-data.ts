import { store } from "store";
import _isEqual from "lodash/isEqual";

import { setElement, setShowProcessInfoDialog } from "store/slices/diagram";

interface IElement {
  type: string;
  businessObject: {
    id: string;
    name: string;
    $attrs: { [key: string]: any };
  };
}

export default class ReceiveData {
  static $inject = ["contextPad"];


  constructor(contextPad: { [key: string]: any }) {
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element: IElement) {
    function handleReceiveData() {
      const category = element?.businessObject.$attrs["custom:category"];
      const type = element?.type;

      console.log(category, type);
      const isAUserTask = _isEqual(category, "usertask") || _isEqual(type, "bpmn:UserTask")

      if (isAUserTask) {
        store.dispatch(
          setShowProcessInfoDialog({ isVisible: true, data: element })
        );
      }

    }
    return {
      "receive-data": {
        group: "utils",
        className: "bpmn-icon-data-object",
        title: "Get data",
        action: {
          click: handleReceiveData,
        },
      },
    };
  }
}

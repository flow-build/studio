import { store } from "store";
import { setShowDataChannelDialog } from "store/slices/diagram";

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
    function handleReceiveData(element: IElement) {
      store.dispatch(
        setShowDataChannelDialog({ isVisible: true, data: { element } })
      );
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

import { store } from "store/index";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import {
  setProcessSelected,
  setShowConfirmationDialog,
} from "store/slices/diagram";
import { getHistoryByProcessId } from "services/resources/processes/history";
import { listStatesByProcessId } from "services/resources/processes/list-states";
import { TState } from "models/state";

interface IElement {
  type: string;
  businessObject: {
    id: string;
    name: string;
    $attrs: { [key: string]: any };
  };
}

export default class NextProcess {
  static $inject = ["contextPad"];

  constructor(contextPad: { [key: string]: any }) {
    console.log(contextPad);
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element: IElement) {
    function openDialog(
      message: string,
      onConfirm?: () => void,
      navigateTo?: string
    ) {
      store.dispatch(
        setShowConfirmationDialog({
          isVisible: true,
          data: {
            message,
            onConfirm,
            navigateTo,
          },
        })
      );
    }

    async function handleStartCategory(nodeSelected: TState) {
      const message = "Tem certeza que deseja navegar para o processo pai?";

      const parentProcessId = nodeSelected?.actor_data?.parentProcessData?.id;

      if (!parentProcessId) {
        openDialog("Não existe processo pai para navegar");
        return;
      }

      const process = await listStatesByProcessId(parentProcessId);
      const navigateTo = `/dashboard/workflows/${process.workflow.id}/diagram`;
      const onConfirm = () => store.dispatch(setProcessSelected(process));

      openDialog(message, onConfirm, navigateTo);
    }

    async function handleStartProcessCategory(nodeSelected: TState) {
      const message = "Tem certeza que deseja navegar para o processo filho?";

      const child_process_id = nodeSelected?.result?.process_id;
      const process = await listStatesByProcessId(child_process_id);
      const navigateTo = `/dashboard/workflows/${process.workflow.id}/diagram`;
      const onConfirm = () => store.dispatch(setProcessSelected(process));

      openDialog(message, onConfirm, navigateTo);
    }

    async function handleNextProcess() {
      const elementSelected = store.getState().diagramPage.element;
      const processSelected = store.getState().diagramPage.processSelected;

      if (elementSelected && processSelected) {
        const category = elementSelected.category;
        const elementId = elementSelected.id;

        const processList = await getHistoryByProcessId(processSelected.id);

        const nodeSelected = processList.find(
          (process) => process.node_id === elementId.replace("Node_", "")
        );

        if (!nodeSelected) {
          return;
        }

        if (_isEqual(elementId, "Node_START")) {
          await handleStartCategory(nodeSelected);
          return;
        }

        if (_isEqual(category, "startprocess") && !_isEmpty(processSelected)) {
          await handleStartProcessCategory(nodeSelected);
          return;
        }
      }
    }

    const category = element?.businessObject.$attrs["custom:category"];
    const type = element?.type;

    const isPossibleToNavigate =
      _isEqual(category, "startprocess") || _isEqual(type, "bpmn:StartEvent");

    if (isPossibleToNavigate) {
      return {
        "handle.get-next-process": {
          group: "utils",
          className: "bpmn-icon-intermediate-event-throw-link",
          title: "Get Next Process",
          action: {
            click: handleNextProcess,
          },
        },
      };
    }
  }
}

import { store } from "store/index";

import { isAny } from "bpmn-js/lib/features/modeling/util/ModelingUtil";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import {
  setProcessSelected,
  setShowConfirmationDialog,
} from "store/slices/diagram";
import { getHistoryByProcessId } from "services/resources/processes/history";
import { listStatesByProcessId } from "services/resources/processes/list-states";

export default class NextProcess {
  constructor(config, contextPad, create, elementFactory, injector, translate) {
    console.log(
      config,
      contextPad,
      create,
      elementFactory,
      injector,
      translate
    );
    // this.create = create;
    // this.elementFactory = elementFactory;
    // this.translate = translate;

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    async function handleNextProcess(element) {
      const category = element?.businessObject.$attrs["custom:category"];
      const processSelected = store.getState().comparePage.processSelected;
      console.log(store.getState());
      return;
      if (_isEqual(category, "startprocess") && !_isEmpty(processSelected)) {
        const processList = await getHistoryByProcessId(processSelected.id);

        const nodeSelected = processList.find(
          (process) => process.node_id === element?.id.replace("Node_", "")
        );

        const child_process_id = nodeSelected?.result?.process_id;

        if (!_isEmpty(child_process_id)) {
          store.dispatch(
            setShowConfirmationDialog({
              isVisible: true,
              data: {
                message:
                  "Tem certeza que deseja navegar para o processo filho?",
                onConfirm: async () => {
                  const response = await listStatesByProcessId(
                    child_process_id
                  );

                  store.dispatch(setProcessSelected(response));
                },
                navigateTo: 
                  `/dashboard/workflows/${response.workflow_id}/diagram`
              },
            })
          );
        }
      }
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
        "handle.get-next-process": {
          group: "utils",
          className: "bpmn-icon-intermediate-event-throw-link",
          title: "Get Next Process",
          action: {
            click: () => handleNextProcess(),
          },
        },
      };
    }
  }
}

NextProcess.$inject = [
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];

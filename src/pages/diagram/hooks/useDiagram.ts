import { useCallback, useEffect, useRef, useState } from "react";
import { useSnackbar, OptionsObject } from "notistack";
import Modeler from "bpmn-js/lib/Modeler";

import { useTheme } from "@mui/material/styles";

import _first from "lodash/first";
import _greaterThan from "lodash/gt";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import _size from "lodash/size";

import { ServiceTask } from "pages/diagram/components/context-pad/service-task";
import { UserTask } from "pages/diagram/components/context-pad/user-task";
import { ResetPad } from "pages/diagram/components/context-pad/reset-pad";
import { CustomPalette } from "pages/diagram/components/custom-palette";
import { EndEvent } from "pages/diagram/components/context-pad/end-event";
import { Timer } from "pages/diagram/components/context-pad/timer";
import { Flow } from "pages/diagram/components/context-pad/flow";
import { SubProcess } from "pages/diagram/components/context-pad/sub-process";
import { Process } from "pages/diagram/components/context-pad/process";
import { ChangeElement } from "pages/diagram/components/context-pad/change-element";
import { Properties } from "pages/diagram/components/context-pad/properties";
import { RemoveElement } from "pages/diagram/components/context-pad/remove-element";
import { ConnectElement } from "pages/diagram/components/context-pad/connect-element";

import { listByWorkflowId } from "services/resources/diagrams/list-by-workflow-id";
import { useDispatch, useSelector } from "react-redux";
import {
  setProcessSelected,
  setShowConfirmationDialog,
} from "store/slices/diagram";
import { TProcess } from "models/process";
import { getHistoryByProcessId } from "services/resources/processes/history";
import { listStatesByProcessId } from "services/resources/processes/list-states";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";

interface IColor {
  backgroundColor?: string;
  borderColor?: string;
  fill?: string;
  stroke?: string;
}

interface IElement {
  teste: any;
  color: IColor;
}

let bpmnViewer: any = null;

export function useDiagram() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const diagramBPMN = useRef();

  const [initialElements, setInitialElements] = useState<IElement[]>([]);
  const [diagramXML, setDiagramXML] = useState<any>();

  const { enqueueSnackbar } = useSnackbar();
  const diagramPageState = useSelector((state: RootState) => state.diagramPage);

  async function downloadXML(modeler: any) {
    try {
      const response = await modeler.saveXML({ format: true });
      const file = new Blob([response.xml], { type: "text/xml" });
      const canvas = modeler.get("canvas");

      const element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = canvas.getRootElement().businessObject["id" || "name"];

      document.body.appendChild(element);

      element.click();
    } catch (error) {
      const message = "Erro ao baixar diagrama em XML";
      const options: OptionsObject = {
        autoHideDuration: 2000,
        variant: "error",
      };

      enqueueSnackbar(message, options);
    }
  }

  const loadDiagram = useCallback(async (id: string) => {
    const response = await listByWorkflowId(id);
    setDiagramXML(response);
  }, []);

  const createModeler = useCallback(() => {
    return new Modeler({
      container: diagramBPMN.current,
      bpmnRenderer: {
        defaultFillColor: theme?.palette?.background?.default,
        defaultStrokeColor: theme?.palette?.common?.white,
      },
      additionalModules: [
        {
          __init__: [
            "contextPadProvider",
            "customEndEventPad",
            "customTimerPad",
            "customFlowPad",
            "customUserTaskPad",
            "customServiceTaskPad",
            "customSubProcessPad",
            "customProcessPad",
            "customConnectElementPad",
            "customChangeElementPad",
            "customPropertiesPad",
            "customRemoveElementPad",
            "customPalette",
          ],
          contextPadProvider: ["type", ResetPad],
          customEndEventPad: ["type", EndEvent], // Menu que aparece quando clica no shape
          customTimerPad: ["type", Timer], // Menu que aparece quando clica no shape
          customFlowPad: ["type", Flow], // Menu que aparece quando clica no shape
          customUserTaskPad: ["type", UserTask], // Menu que aparece quando clica no shape
          customServiceTaskPad: ["type", ServiceTask], // Menu que aparece quando clica no shape
          customSubProcessPad: ["type", SubProcess], // Menu que aparece quando clica no shape
          customProcessPad: ["type", Process], // Menu que aparece quando clica no shape
          customConnectElementPad: ["type", ConnectElement], // Menu que aparece quando clica no shape
          customChangeElementPad: ["type", ChangeElement], // Menu que aparece quando clica no shape
          customPropertiesPad: ["type", Properties], // Menu que aparece quando clica no shape
          customRemoveElementPad: ["type", RemoveElement], // Menu que aparece quando clica no shape
          customPalette: ["type", CustomPalette], // Menu da esquerda com elementos
        },
      ],
    }) as any;
  }, [theme?.palette?.background?.default, theme?.palette?.common?.white]);

  const onImportDone = useCallback((event: any) => {
    const { error /* , warnings */ } = event;

    if (error) {
      // return this.handleError(error);
    }

    bpmnViewer.get("canvas").zoom("fit-viewport", "auto");
    bpmnViewer.get("canvas").zoom(0.6);

    const arr: Array<IElement> = [];
    const elements = bpmnViewer.get("elementRegistry").getAll() as Array<any>;
    elements.forEach((element) => {
      const color: IColor = {
        backgroundColor: undefined,
        borderColor: undefined,
        fill: undefined,
        stroke: undefined,
      };

      if (element.di["background-color"]) {
        color.backgroundColor = element.di["background-color"];
      }

      if (element.di["border-color"]) {
        color.borderColor = element.di["border-color"];
      }

      if (element.di["fill"]) {
        color.fill = element.di["fill"];
      }

      if (element.di["stroke"]) {
        color.stroke = element.di["stroke"];
      }

      arr.push({
        teste: element,
        color,
      });
    });

    setInitialElements(arr);
    // setHaha(new Date());
  }, []);

  useEffect(() => {
    if (diagramBPMN?.current) {
      bpmnViewer = createModeler();

      bpmnViewer.on("import.done", onImportDone);

      if (!_isEmpty(diagramXML)) {
        bpmnViewer.importXML(diagramXML);
      }
    }

    return () => bpmnViewer?.destroy();
  }, [createModeler, diagramBPMN, diagramXML, onImportDone]);

  const onSelectionChanged = useCallback(
    async (elements: any) => {
      /* TODO: Refatorar */
      if (_isEmpty(elements?.newSelection)) {
        return;
      }

      const totalElements = _size(elements?.newSelection);
      const isMultipleSelection = _greaterThan(totalElements, 1);

      if (isMultipleSelection) {
        return;
      }

      const element = _first<{ [key: string]: any }>(elements?.newSelection);

      if (_isEmpty(element)) {
        return;
      }
      const processSelected = diagramPageState.processSelected;

      console.log({ element });

      /* TODO: Refatorar */
      /* Handle Node_START */
      if (_isEqual(element?.id, "Node_START")) {
        const processList = (
          await getHistoryByProcessId((processSelected as TProcess).id)
        ).reverse() as any;

        const parent_process_id =
          processList[0].actor_data.parentProcessData.id;

        if (!_isEmpty(parent_process_id)) {
          dispatch(
            setShowConfirmationDialog({
              isVisible: true,
              data: {
                message: "Tem certeza que deseja navegar para o processo pai?",
                onConfirm: async () => {
                  const response = await listStatesByProcessId(
                    parent_process_id
                  );

                  dispatch(setProcessSelected(response));

                  return navigate(
                    `/dashboard/workflows/${response.workflow_id}/diagram`
                  );
                },
              },
            })
          );
        }

        return;
      }

      const category = element?.businessObject.$attrs["custom:category"];

      if (_isEqual(category, "startprocess") && !_isEmpty(processSelected)) {
        const processList = await getHistoryByProcessId(
          (processSelected as TProcess).id
        );

        const nodeSelected = processList.find(
          (process) => process.node_id === element?.id.replace("Node_", "")
        );

        const child_process_id = nodeSelected?.result?.process_id;

        if (!_isEmpty(child_process_id)) {
          dispatch(
            setShowConfirmationDialog({
              isVisible: true,
              data: {
                message:
                  "Tem certeza que deseja navegar para o processo filho?",
                onConfirm: async () => {
                  const response = await listStatesByProcessId(
                    child_process_id
                  );

                  dispatch(setProcessSelected(response));

                  return navigate(
                    `/dashboard/workflows/${response.workflow_id}/diagram`
                  );
                },
              },
            })
          );
        }
      }
    },
    [diagramPageState.processSelected, dispatch, navigate]
  );

  useEffect(() => {
    if (
      !_isEmpty(initialElements) &&
      !_isEmpty(diagramPageState.processSelected)
    ) {
      bpmnViewer?.on("selection.changed", onSelectionChanged);
    }
  }, [diagramPageState.processSelected, initialElements, onSelectionChanged]);

  return {
    downloadXML,
    loadDiagram,
    bpmn: diagramBPMN,
    modeler: bpmnViewer,
    initialElements,
  };
}

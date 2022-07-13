import { useCallback, useEffect, useRef, useState } from "react";
import { useSnackbar, OptionsObject } from "notistack";
import Modeler from "bpmn-js/lib/Modeler";

import { useTheme } from "@mui/material/styles";

import _isEmpty from "lodash/isEmpty";

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
  const theme = useTheme();

  const diagramBPMN = useRef();

  const [initialElements, setInitialElements] = useState<IElement[]>([]);
  const [diagramXML, setDiagramXML] = useState<any>();

  const { enqueueSnackbar } = useSnackbar();

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
            "customPropertiesPad",
            "customChangeElementPad",
            "customRemoveElementPad",
            "customConnectElementPad",
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
          customPropertiesPad: ["type", Properties], // Menu que aparece quando clica no shape
          customChangeElementPad: ["type", ChangeElement], // Menu que aparece quando clica no shape
          customRemoveElementPad: ["type", RemoveElement], // Menu que aparece quando clica no shape
          customConnectElementPad: ["type", ConnectElement], // Menu que aparece quando clica no shape
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

  return {
    downloadXML,
    loadDiagram,
    bpmn: diagramBPMN,
    modeler: bpmnViewer,
    initialElements,
  };
}

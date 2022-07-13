import { useCallback, useEffect, useRef, useState } from "react";
import { useSnackbar, OptionsObject } from "notistack";
import Modeler from "bpmn-js/lib/Modeler";

import { useTheme } from "@mui/material/styles";

import _isEmpty from "lodash/isEmpty";

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

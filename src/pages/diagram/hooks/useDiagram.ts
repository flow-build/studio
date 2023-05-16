import { useCallback, useEffect, useRef, useState } from "react";
import { useSnackbar, OptionsObject } from "notistack";
import Modeler from "bpmn-js/lib/Modeler";
import { validate as uuidValidate } from "uuid";

import { useTheme } from "@mui/material/styles";

import _first from "lodash/first";
import _greaterThan from "lodash/gt";
import _isEmpty from "lodash/isEmpty";
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
import { NextProcess } from "../components/context-pad/next-process";
import { ChangeElement } from "pages/diagram/components/context-pad/change-element";
import { Properties } from "pages/diagram/components/context-pad/properties";
import { RemoveElement } from "pages/diagram/components/context-pad/remove-element";
import { ConnectElement } from "pages/diagram/components/context-pad/connect-element";
import { EmptyPalette } from "pages/diagram/components/empty-palette";
import { ReceiveData } from "pages/diagram/components/context-pad/receive-data";

import { listByWorkflowId } from "services/resources/workflows/list-by-workflow-id";
import { listById } from "services/resources/diagrams/list-by-id";
import { useDispatch, useSelector } from "react-redux";
import { setElement } from "store/slices/diagram";

import { RootState } from "store";
import { useParams } from "react-router-dom";

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
  const viewboxRef = useRef();

  const diagramBPMN = useRef();

  const { id } = useParams();

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

  const loadDiagram = useCallback(
    async (workflowId: string) => {
      const response = await listByWorkflowId(workflowId);

      if (!id || !uuidValidate(id)) {
        return setDiagramXML(response);
      }

      const xml = await listById(id as string);
      return setDiagramXML(xml || response);
    },
    [id]
  );

  const createModeler = useCallback(() => {
    const editIcons = [
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
    ];

    const readonlyIcons = [
      {
        __init__: [
          "contextPadProvider",
          "customPropertiesPad",
          "customNextProcess",
          "customReceiveData",
          "paletteProvider",
        ],
        contextPadProvider: ["type", ResetPad],
        customNextProcess: ["type", NextProcess],
        customReceiveData: ["type", ReceiveData],
        customPropertiesPad: ["type", Properties], // Menu que aparece quando clica no shape
        paletteProvider: ["type", EmptyPalette], // Menu da esquerda com elementos
      },
    ];

    return new Modeler({
      container: diagramBPMN.current,
      bpmnRenderer: {
        defaultFillColor: theme?.palette?.background?.default,
        defaultStrokeColor: theme?.palette?.common?.white,
      },
      additionalModules: !_isEmpty(diagramPageState.processSelected)
        ? readonlyIcons
        : editIcons,
    }) as any;
  }, [
    theme?.palette?.background?.default,
    theme?.palette?.common?.white,
    diagramPageState.processSelected,
  ]);

  const onImportDone = useCallback((event: any) => {
    const { error /* , warnings */ } = event;

    if (error) {
      // return this.handleError(error);
      return;
    }

    if (!viewboxRef.current) {
      bpmnViewer.get("canvas").zoom("fit-viewport", "auto");
      bpmnViewer.get("canvas").zoom(0.6);
    } else {
      bpmnViewer.get("canvas").viewbox(viewboxRef.current);
    }

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
      bpmnViewer.on("canvas.viewbox.changed", () => {
        viewboxRef.current = bpmnViewer.get("canvas").viewbox();
      });

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

      const category = element?.businessObject.$attrs["custom:category"];

      dispatch(setElement({ category, id: element?.id }));
    },
    [dispatch]
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

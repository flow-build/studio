import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "assets/styles/bpmnStyles.css";

import extraPropertiesModeler from "bpmn/extraProperties";
import { blankDiagram } from "utils/blankDiagram";

import {
  Stack,
  Button,
  Input,
  Typography,
  Grid,
  Tooltip
} from "@mui/material";
import {
  ZoomInOutlined,
  ZoomOutOutlined
} from "@mui/icons-material";
import { DiagramPanel, SidebarSearch } from "components";

const DiagramCreate = () => {
  const theme = useTheme();
  const container = useRef(null);

  const [modeler, setModeler] = useState(null);

  const handleUploadFile = ({ target }) => {
    if (!target.files) return;

    Array.from(target.files)?.forEach((file) =>
      handleSetModeler(URL.createObjectURL(file))
    );
  };

  const handleCreateDiagram = (xml) => {
    if (modeler) modeler.destroy();

    const model = extraPropertiesModeler(container.current, {
      bpmnRenderer: {
        defaultFillColor: theme?.palette?.background?.default,
        defaultStrokeColor: theme?.palette?.common?.white,
      },
    });

    setModeler(model);

    model.importXML(xml);
    model.get("canvas").zoom("fit-viewport");
  };

  const handleSetModeler = async (value) => {
    if (!value) return;

    try {
      const { data } = await axios.get(value);

      handleCreateDiagram(data);
    } catch (e) {
      console.error(
        `Pages/DiagramCreate/handleSetModeler => ${e.error}: ${e.message}`
      );
    }
  };

  const handleOnSaveXML = async () => {
    if (!modeler) return;

    const { xml } = await modeler.saveXML();

    if (!xml) return;

    const canvas = modeler.get("canvas");
    const blob = new Blob([xml], { type: "xml" });
    const link = document.createElement("a");

    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute(
      "download",
      canvas.getRootElement().businessObject["id" || "name"]
    );

    link.style.display = "none";

    link.click();
  };

  const handleZoomIn = () => {
    if (!modeler) return;

    modeler.get("zoomScroll").stepZoom(1);
  };

  const handleZoomOut = () => {
    if (!modeler) return;

    modeler.get("zoomScroll").stepZoom(-1);
  };

  // const handleOnDrawDiagram = async () => {
  //   if (!searchProcessIdDialogData.workflow_id) return;

  //   dispatch(setSearchProcessIdDialog(false))

  //   try {
  //     const { data: blueprintXML } = await dispatch(
  //       workflowService.endpoints.getWorkflowDiagram.initiate(
  //         searchProcessIdDialogData?.workflow_id
  //       )
  //     );

  //     await modeler.importXML(blueprintXML);

  //     const { data: process } = await dispatch(
  //       workflowService.endpoints.getProcessHistory.initiate(
  //         searchProcessIdDialogData?.id
  //       )
  //     );

  //     const orderedData = [...process].reverse();
  //     const modeling = modeler.get("modeling");
  //     const elementRegistry = modeler.get("elementRegistry");

  //     orderedData.forEach((history) => {
  //       const element = elementRegistry.get(`Node_${history.node_id}`);

  //       modeling.setColor(element, {
  //         fill: statusColors[`${history.status}`],
  //       });
  //     });

  //     dispatch(setSelectedProcess(searchProcessId));
  //     setSearchProcessId('')
  //   } catch (e) {
  //     console.error(
  //       `DiagramCreate/handleOnDrawDiagram => ${e.error}: ${e.message}`
  //     );
  //   }
  // };

  useEffect(() => {
    handleCreateDiagram(blankDiagram);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "5px 10px",
        }}
      >
        <Typography variant="h5" component="h2">
          Diagrama
        </Typography>
        <Stack spacing={2} direction="row">
          <SidebarSearch />
          <Tooltip title="Zoom In">
            <Button variant="outlined" onClick={handleZoomIn}>
              <ZoomInOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Zoom out">
            <Button variant="outlined" onClick={handleZoomOut}>
              <ZoomOutOutlined />
            </Button>
          </Tooltip>
          <label htmlFor="uploadXml">
            <Input
              type="file"
              id="uploadXml"
              accept="text/xml"
              sx={{
                display: "none",
              }}
              onChange={handleUploadFile}
            />
            <Button variant="contained" component="span">
              Carregar XML
            </Button>
          </label>
          <Button variant="contained" onClick={handleOnSaveXML}>
            Download XML
          </Button>
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        ref={container}
        sx={{
          height: "calc(100vh - 140px)",
        }}
      />
      <Grid item xs={12}>
        <DiagramPanel modeler={modeler} />
      </Grid>
    </Grid>
  );
};

export default DiagramCreate;

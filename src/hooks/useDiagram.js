import { contrastingColor, statusColors } from 'utils/statusColors'

const useDiagram = () => {

  const handleZoomIn = (modeler) => {
    if (!modeler) return;

    modeler.get("zoomScroll").stepZoom(1);
  };

  const handleZoomOut = (modeler) => {
    if (!modeler) return;

    modeler.get("zoomScroll").stepZoom(-1);
  };

  const handleOnSaveXML = async (modeler) => {
    try {
      const { xml } = await modeler.saveXML({ format: true });

      const canvas = modeler.get("canvas");
      const blob = new Blob([xml], { type: "text/xml" });
      const link = document.createElement("a");

      link.setAttribute("href", URL.createObjectURL(blob));
      link.setAttribute(
        "download",
        canvas.getRootElement().businessObject["id" || "name"]
      );

      link.style.display = "none";

      link.click();
    } catch (e) {
      console.error(
        `Hooks/useDiagram/handleOnSaveXML => ${e.error}: ${e.message}`
      );
    }
  }

  const handleDrawOnDiagram = (modeler, data) => {
    if(!modeler && !data) return

    const modeling = modeler.get('modeling')
    const elementRegistry = modeler.get('elementRegistry')

    data.forEach((history) => {
      const element = elementRegistry.get(`Node_${history.node_id}`)

      modeling.setColor(element, {
        fill: statusColors[history.status],
		stroke: contrastingColor(statusColors[`${history.status}`])
      })
    })
  }

  return {
      handleZoomIn,
      handleZoomOut,
      handleOnSaveXML,
      handleDrawOnDiagram
  }
};

export default useDiagram;

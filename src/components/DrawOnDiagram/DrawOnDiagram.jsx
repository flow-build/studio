import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDiagram } from "hooks";

import { workflowService } from "services/workflowService";

const DrawOnDiagram = ({ modeler }) => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const { handleDrawOnDiagram } = useDiagram();

  useEffect(() => {
    if (!pid) return;

    async function draw() {
      try {
        const { data } = await dispatch(
          workflowService.endpoints.getProcessHistory.initiate(pid)
        );

        const orderedData = [...data].reverse();

        handleDrawOnDiagram(modeler, orderedData);
      } catch (e) {
        console.error(
          `components/DrawDiagram/draw => ${e.error}: ${e.message}`
        );
      }
    }

    draw();
  }, [pid, modeler]);

  return <></>;
};

export default DrawOnDiagram;

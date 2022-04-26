import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDiagram } from "pages/workflows/diagram/hooks/useDiagram";

import { workflowService } from "pages/workflows/diagram/services/workflowService";

export const DrawOnDiagram: React.FC<any> = ({ modeler }) => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const { handleDrawOnDiagram } = useDiagram();

  useEffect(() => {
    if (!pid) return;

    async function draw() {
      try {
        const { data } = await dispatch<any>(
          workflowService.endpoints.getProcessHistory.initiate(pid)
        );

        const orderedData = [...data].reverse();

        handleDrawOnDiagram(modeler, orderedData);
      } catch (e: any) {
        console.error(
          `components/DrawDiagram/draw => ${e.error}: ${e.message}`
        );
      }
    }

    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid, modeler]);

  return <></>;
};


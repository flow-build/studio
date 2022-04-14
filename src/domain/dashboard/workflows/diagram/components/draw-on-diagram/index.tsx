import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useDiagram } from "domain/dashboard/workflows/diagram/hooks/useDiagram";

import { workflowService } from "domain/dashboard/workflows/diagram/services/workflowService";

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
  }, [pid, modeler]);

  return <></>;
};


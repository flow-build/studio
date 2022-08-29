import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { RootState } from "store";

import * as S from "./styles";
import { listWorkflowById } from "services/resources/workflows/list-by-id";
import { Section } from "pages/compare-json/components/Section";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  workflowId: string;
};

export const ShowDataChannel: FC<Props> = ({ isOpen, onClose, workflowId }) => {
  const [dataChannel, setDataChannel] = useState({
    category: undefined,
    parameters: undefined,
  });

  const { showDataChannelDialog } = useSelector(
    (state: RootState) => state.diagramPage
  );

  useEffect(() => {
    const request = async () => {
      const element = showDataChannelDialog.data.element;
      const elementId = element.id.replace("Node_", "");

      const workflow = await listWorkflowById(workflowId);

      const nodeSelected = workflow.blueprint_spec.nodes.find((node: any) =>
        _isEqual(node.id, elementId)
      );

      setDataChannel({
        category: nodeSelected.category,
        parameters: nodeSelected.parameters,
      });
    };
    if (workflowId) {
      request();
    }
  }, [showDataChannelDialog.data.element, workflowId]);

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        show data
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <S.Content>
        <Grid container spacing={1}>
          <Grid item xs>
            <Paper>xs</Paper>
          </Grid>
          <Grid item xs>
            <Paper sx={{ height: 140 }}>xs=6</Paper>
          </Grid>
        </Grid>
      </S.Content>
    </S.Wrapper>
  );
};

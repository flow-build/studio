import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import Box from "@mui/material/Box";

import { RootState } from "store";

import { listWorkflowById } from "services/resources/workflows/list-by-id";

import * as S from "./styles";
import { TState } from "models/state";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  workflowId: string;
};

interface IProperties {
  category?: string;
  parameters?: { [key: string]: any };
  bag?: { [key: string]: any };
  previousNode?: TState;
  result?: { [key: string]: any };
}

export const Properties: FC<Props> = ({ isOpen, onClose, workflowId }) => {
  const [properties, setProperties] = useState<IProperties>({
    category: undefined,
    parameters: undefined,
    bag: undefined,
    result: undefined,
    previousNode: undefined,
  });

  const { propertiesDialog } = useSelector(
    (state: RootState) => state.diagramPage
  );

  const { history } = useSelector((state: RootState) => state.processHistory);

  useEffect(() => {
    const request = async () => {
      const element = propertiesDialog.data.element;
      const elementId = element.id.replace("Node_", "");

      const workflow = await listWorkflowById(workflowId);

      const nodeSelected = workflow.blueprint_spec.nodes.find((node: any) =>
        _isEqual(node.id, elementId)
      );

      const nodeSelectedFromHistory = history.find((node: any) =>
        _isEqual(node.node_id, elementId)
      );

      let previousNode: TState | undefined;
      const currentStepNumber = nodeSelectedFromHistory?.step_number ?? 0;
      if (currentStepNumber > 1) {
        previousNode = history.find((node: any) =>
          _isEqual(node.step_number, currentStepNumber - 1)
        ) as TState;
      }

      setProperties({
        category: nodeSelected.category,
        parameters: nodeSelected.parameters,
        bag: nodeSelectedFromHistory?.bag,
        result: nodeSelectedFromHistory?.result,
        previousNode: previousNode,
      });
    };

    if (workflowId) {
      request();
    }
  }, [propertiesDialog.data.element, workflowId, history]);

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Propriedades
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <S.Content>
        <Box
          sx={{
            width: 350,
          }}
        >
          {!_isEmpty(properties.category) && (
            <S.Text>Category: {properties.category}</S.Text>
          )}
          <S.Text>Previous State</S.Text>
          <S.Editor
            value={JSON.stringify(
              {
                bag: properties?.previousNode?.bag,
                result: properties?.previousNode?.result,
              },
              null,
              4
            )}
          />
        </Box>

        <Box
          sx={{
            width: 350,
            marginLeft: 2,
          }}
        >
          {!_isEmpty(properties.category) && (
            <S.Text>Category: {properties.category}</S.Text>
          )}
          <S.Text>Spec</S.Text>
          <S.Editor value={JSON.stringify(properties.parameters, null, 4)} />
        </Box>

        <Box
          sx={{
            width: 350,
            marginLeft: 2,
          }}
        >
          {!_isEmpty(properties.category) && (
            <S.Text>Category: {properties.category}</S.Text>
          )}
          <S.Text>Execution Data</S.Text>
          <S.Editor />
        </Box>

        <Box
          sx={{
            width: 350,
            marginLeft: 2,
          }}
        >
          {!_isEmpty(properties.category) && (
            <S.Text>Category: {properties.category}</S.Text>
          )}
          <S.Text>State</S.Text>
          <S.Editor
            value={JSON.stringify(
              { bag: properties.bag, result: properties.result },
              null,
              4
            )}
          />
        </Box>
      </S.Content>
    </S.Wrapper>
  );
};

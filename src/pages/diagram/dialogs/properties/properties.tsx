import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import { RootState } from "store";

import { listWorkflowById } from "services/resources/workflows/list-by-id";

import * as S from "./styles";
import { TState } from "models/state";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  workflowId: string;
};
interface INodeData {
  bag?: { [key: string]: any };
  result?: { [key: string]: any };
  category?: string;
  parameters?: { [key: string]: any };
}
interface IPayload {
  current: INodeData;
  previous: INodeData;
}

export const Properties: FC<Props> = ({ isOpen, onClose, workflowId }) => {
  const [nodeData, setNodeData] = useState<IPayload>({
    current: {
      bag: {},
      result: {},
      category: "",
      parameters: {},
    },
    previous: {
      bag: {},
      result: {},
      category: "",
      parameters: {},
    },
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

      const previrousCategory = workflow.blueprint_spec.nodes.find(
        (node: any) => _isEqual(node.id, previousNode?.node_id)
      );

      setNodeData({
        current: {
          bag: nodeSelectedFromHistory?.bag,
          result: nodeSelectedFromHistory?.result,
          category: nodeSelected.category,
          parameters: nodeSelected?.parameters,
        },
        previous: {
          bag: previousNode?.bag,
          result: previousNode?.result,
          category: previrousCategory?.category,
          parameters: previrousCategory?.parameters,
        },
      });
    };

    if (workflowId) {
      request();
    }
  }, [propertiesDialog.data.element, workflowId, history]);

  const previousNode = {
    bag: nodeData?.previous?.bag,
    result: nodeData?.previous?.result,
  };

  const spec = nodeData?.current?.parameters;

  const propertiesState = {
    bag: nodeData?.current.bag,
    result: nodeData?.current?.result,
  };

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Properties
        {!_isEmpty(nodeData?.current?.category) && (
          <S.Text>Category: {nodeData?.current?.category}</S.Text>
        )}
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <S.Content>
        <S.BoxContent>
          <S.Text>Previous State</S.Text>
          <S.Editor value={JSON.stringify(previousNode, null, 4)} />
        </S.BoxContent>

        <S.BoxContent>
          <S.Text>Spec</S.Text>
          <S.Editor value={JSON.stringify(spec, null, 4)} />
        </S.BoxContent>

        <S.BoxContent>
          <S.Text>Execution Data</S.Text>
          <S.Editor />
        </S.BoxContent>

        <S.BoxContent>
          <S.Text>State</S.Text>
          <S.Editor value={JSON.stringify(propertiesState, null, 4)} />
        </S.BoxContent>
      </S.Content>
    </S.Wrapper>
  );
};

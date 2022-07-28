import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import Box from "@mui/material/Box";

import { getWorkflowByName } from "services/resources/workflows/get-by-name";

import { RootState } from "store";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

export const Properties: FC<Props> = ({ isOpen, onClose }) => {
  const [properties, setProperties] = useState({
    category: undefined,
    parameters: undefined,
  });

  const { propertiesDialog } = useSelector(
    (state: RootState) => state.diagramPage
  );

  useEffect(() => {
    const request = async () => {
      const element = propertiesDialog.data.element;
      const elementId = element.id.replace("Node_", "");

      const workflow = await getWorkflowByName("pizza2");

      const nodeSelected = workflow.blueprint_spec.nodes.find((node: any) =>
        _isEqual(node.id, elementId)
      );

      setProperties({
        category: nodeSelected.category,
        parameters: nodeSelected.parameters,
      });
    };

    request();
  }, [propertiesDialog.data.element]);

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>
        Propriedades
        <S.CloseButton onClick={onClose} />
      </S.Title>

      <S.Content>
        {!_isEmpty(properties.category) && (
          <S.Text>Category: {properties.category}</S.Text>
        )}

        <Box sx={{ mt: 2 }}>
          <S.Text>Parameters</S.Text>
          <S.Editor value={JSON.stringify(properties.parameters, null, 4)} />
        </Box>
      </S.Content>
    </S.Wrapper>
  );
};

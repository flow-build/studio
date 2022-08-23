import AddOutlined from "@mui/icons-material/AddOutlined";
import ExtensionOutlined from "@mui/icons-material/ExtensionOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

import { TWorkflow } from "models/workflow";

import { useWorkflowPage } from "pages/workflows/hooks/useWorkflowPage";
import { useState } from "react";

import { getLongFormatByDate } from "shared/utils/date";
import { Modal } from "../modal";

import * as S from "./styles";

type Props = {
  workflows: TWorkflow[];
};

export const CardsView: React.FC<Props> = ({ workflows }) => {
  const workflowPage = useWorkflowPage();
  const [openDialog, setOpenDialog] = useState(false);

  const getActions = (workflow: TWorkflow) => {
    return [
      {
        icon: VisibilityOutlined,
        tooltip: "Ver processos",
        onClick: () => workflowPage.navigateToProcess(workflow.workflow_id),
      },
      {
        icon: AddOutlined,
        tooltip: "Novo processo",
        onClick: () => setOpenDialog(true),
      },
      {
        icon: ExtensionOutlined,
        tooltip: "Ver diagrama",
        onClick: () => workflowPage.navigateToDiagram(workflow.workflow_id),
      },
    ];
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {workflows.map((workflow) => (
        <S.Cards
          key={workflow.workflow_id}
          title={workflow.name}
          subtitle={workflow.workflow_id}
          description={workflow.description}
          headerTitle={`Versão ${workflow.version}`}
          footerTitle={getLongFormatByDate(workflow.created_at)}
          actions={getActions(workflow)}
        />
      ))}

      <Modal
        onClose={handleDialogClose}
        open={openDialog}
        onClick={() =>
          workflowPage.createProcess(workflow.name, workflow.workflow_id)
        }
      />
    </>
  );
};

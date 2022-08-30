import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ExtensionOutlined, VisibilityOutlined } from "@mui/icons-material";

import { TProcess } from "models/process";

import { useProcessesPage } from "pages/processes/hooks/useProcessesPage";

import { getLongFormatByDate } from "shared/utils/date";
import { setProcessSelected } from "store/slices/diagram";

export function useTable(processes: TProcess[]) {
  const processPage = useProcessesPage();
  const dispatch = useDispatch();

  const columnData = useMemo(() => {
    return [
      { id: "nodeID", name: "Node Id" },
      { id: "processId", name: "Process ID" },
      { id: "status", name: "Status" },
      { id: "createdAt", name: "Created at" },
      { id: "actions", name: "Actions" },
    ];
  }, []);

  const rows = useMemo(() => {
    return processes.map((process) => {
      const items = [
        process.state.node_name,
        process.id,
        process.status,
        getLongFormatByDate(process.created_at),
      ];

      const actions = [
        {
          icon: VisibilityOutlined,
          tooltip: "Ver histórico",
          onClick: () => processPage.navigateToHistory(process.id),
        },
        {
          icon: ExtensionOutlined,
          tooltip: "Ver diagrama",
          onClick: () => {
            dispatch(setProcessSelected(process));
            processPage.navigateToDiagram(process.id);
          },
        },
      ];

      return { items, actions };
    });
  }, [dispatch, processPage, processes]);

  return { columnData, rows };
}

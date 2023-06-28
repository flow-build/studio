import { useState } from 'react';

import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { ContentHeader } from 'components/ContentHeader';
import { MiniCardsGrid } from 'components/MiniCardsGrid';
import { MiniCardsGridItem } from 'components/MiniCardsGrid/types';
import { ModeView } from 'shared/enum';
import { ItemsBreadcrumb } from 'stories/components/Breadcrumb/types';

type Props = {
  breadcrumb: ItemsBreadcrumb[];
  table: { rowData: GridRowsProp; columns: GridColDef[] };
  cards: { items: MiniCardsGridItem[]; onChangePage?: (page: number) => void };
  onChangeModeView?: (modeView: ModeView) => void;
};

export const BaseGrid: React.FC<Props> = ({ breadcrumb, cards, onChangeModeView, table }) => {
  const [modeView, setModeView] = useState<ModeView>(ModeView.TABLE);

  const isTableModeView = modeView === ModeView.TABLE;
  const isCardModeView = modeView === ModeView.CARDS;

  const totalPage = Math.ceil(table.rowData.length / 9);

  function handleChangeModeView(modeView: ModeView) {
    setModeView(modeView);

    if (onChangeModeView) {
      onChangeModeView(modeView);
    }
  }

  return (
    <>
      <ContentHeader items={breadcrumb} onChangeModeView={handleChangeModeView} />

      <br />

      {isTableModeView && (
        <DataGrid
          rows={table.rowData}
          columns={table.columns}
          disableColumnMenu
          disableRowSelectionOnClick
          autoPageSize
        />
      )}

      {isCardModeView && (
        <MiniCardsGrid
          items={cards.items}
          totalPage={totalPage}
          onChangePage={cards.onChangePage}
        />
      )}
    </>
  );
};

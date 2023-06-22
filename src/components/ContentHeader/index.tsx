import React, { useState } from 'react';

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ModeView } from 'shared/enum';
import { Breadcrumbs } from 'stories/components';
import { BreadcrumbsProps } from 'stories/components/Breadcrumb/types';

import * as S from './styles';

type Props = {
  items: BreadcrumbsProps['items'];
  initialModeView?: ModeView;
  onChangeModeView?: (modeView: ModeView) => void;
};

export const ContentHeader: React.FC<Props> = ({ items, initialModeView, onChangeModeView }) => {
  const [view, setView] = useState<ModeView>(initialModeView ?? ModeView.TABLE);

  const handleChange = (_: unknown, nextView: ModeView) => {
    setView(nextView);

    if (onChangeModeView) {
      onChangeModeView(nextView);
    }
  };

  return (
    <S.Wrapper>
      <Breadcrumbs items={items} />

      <ToggleButtonGroup orientation="horizontal" value={view} exclusive onChange={handleChange}>
        <ToggleButton value={ModeView.TABLE} aria-label="list">
          <ViewListIcon />
        </ToggleButton>

        <ToggleButton value={ModeView.CARDS} aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </S.Wrapper>
  );
};

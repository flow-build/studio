import { FC, useState } from 'react';

import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';

import * as S from './styles';
import { TabsProps } from './types';

export const Tabs: FC<TabsProps> = ({ items }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const titles = items.map((item, index) => ({ id: `${item.title}-${index}`, text: item.title }));
  const renders = items.map((item, index) => ({ id: `render-${index}`, Element: item.element }));

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <S.Wrapper>
      <MuiTabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
        {titles.map((title, index) => (
          <MuiTab
            key={title.id}
            label={title.text}
            id={`simple-tab-${index}`}
            aria-controls={`simple-tabpanel-${index}`}
          />
        ))}
      </MuiTabs>

      {renders.map(({ id, Element }, index) => (
        <S.TabPanel
          key={id}
          hidden={tabIndex !== index}
          role="tabpanel"
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {tabIndex === index && <Element />}
        </S.TabPanel>
      ))}
    </S.Wrapper>
  );
};

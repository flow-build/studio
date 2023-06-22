import React from 'react';

import { Pagination } from '@mui/material';
import { MiniCardsGridProps } from 'components/MiniCardsGrid/types';

import * as S from './styles';

export const MiniCardsGrid: React.FC<MiniCardsGridProps> = ({ items, totalPage, onChangePage }) => {
  function onChange(_: unknown, value: number) {
    if (onChangePage) {
      onChangePage(value);
    }
  }

  return (
    <>
      <S.Wrapper>
        {items.map((item) => (
          <S.Card key={item.id} name={item.name} description={item.description} text={item.text} />
        ))}
      </S.Wrapper>

      <Pagination style={{ alignSelf: 'center' }} count={totalPage} onChange={onChange} />
    </>
  );
};

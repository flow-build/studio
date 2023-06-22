import React from 'react';

import { Pagination } from '@mui/material';
import { MiniCardsProps } from 'stories/components/MiniCardsCarousel/components/MiniCards/types';

import * as S from './styles';

type Props = {
  items: ({ id: string } & Omit<MiniCardsProps, 'urlImg' | 'urlRedirect'>)[];
  totalPage: number;
  onChangePage?: (page: number) => void;
};

export const MiniCardsGrid: React.FC<Props> = ({ items, totalPage, onChangePage }) => {
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

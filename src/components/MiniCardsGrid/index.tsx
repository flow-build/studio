import React from 'react';

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
          <S.Card
            key={item.id}
            name={item.name}
            description={item.description}
            text={item.text}
            popupMenu={{
              items: [
                { id: '1', label: 'Ver histórico' },
                { id: '2', label: 'Ver diagrama' }
              ]
            }}
          />
        ))}
      </S.Wrapper>

      <S.Pagination count={totalPage} onChange={onChange} />
    </>
  );
};

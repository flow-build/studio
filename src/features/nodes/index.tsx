import React, { useState } from 'react';

import * as S from './styles';
import { NodeCategory, NodeType } from './types';

type Props = {
  categories: NodeCategory[];
  types: NodeType[];
};

export const Nodes: React.FC<Props> = ({ categories = [], types = [] }) => {
  const itemsPerPage = 9;
  const [list, setList] = useState(paginate(1));
  const totalPage = Math.ceil([...categories, ...types].length / itemsPerPage);

  function isCategory(value: NodeCategory | NodeType): value is NodeCategory {
    return 'category' in value;
  }

  function paginate(pageIndex = 1) {
    const page = pageIndex - 1;

    if (page < 0) {
      return [];
    }

    return [...categories, ...types]
      .slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)
      .map((elem) => ({
        id: isCategory(elem) ? elem.category : elem.type,
        title: isCategory(elem) ? 'Category' : 'Type',
        description: isCategory(elem) ? elem.category : elem.type,
        text: `${elem.nodes}`
      }));
  }

  function onChangePage(_: unknown, page: number) {
    console.log({ page });
    const newValues = paginate(page);
    setList(newValues);
  }

  return (
    <S.Wrapper>
      <S.Title>Nodes</S.Title>

      <S.List>
        {list.map((elem) => (
          <S.Card key={elem.id} name={elem.title} description={elem.description} text={elem.text} />
        ))}
      </S.List>

      <S.Pagination count={totalPage} onChange={onChangePage} />
    </S.Wrapper>
  );
};

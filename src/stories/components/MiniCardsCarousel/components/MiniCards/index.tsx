import { Fragment } from 'react';

import Link from 'next/link';

import * as S from './styles';
import { MiniCardsProps } from './types';

export function MiniCards({
  name,
  urlRedirect,
  description,
  urlImg,
  text,
  ...props
}: MiniCardsProps) {
  const Container = urlRedirect ? Link : Fragment;

  return (
    <Container href={urlRedirect ?? ''}>
      <S.Wrapper {...props}>
        {urlImg && <S.Img alt={name} src={urlImg ?? ''} width={155} height={100} />}

        <S.WrapperContent>
          <S.Name>{name}</S.Name>
          <S.Description>{description}</S.Description>
          <S.ContentText>{text}</S.ContentText>
        </S.WrapperContent>
      </S.Wrapper>
    </Container>
  );
}

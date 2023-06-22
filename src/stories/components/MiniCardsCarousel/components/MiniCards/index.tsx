import { useMemo } from 'react';

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
  const content = useMemo(
    () => (
      <S.Wrapper {...props}>
        {urlImg && <S.Img alt={name} src={urlImg ?? ''} width={155} height={100} />}

        <S.WrapperContent>
          <S.Name>{name}</S.Name>
          <S.Description>{description}</S.Description>
          <S.ContentText>{text}</S.ContentText>
        </S.WrapperContent>
      </S.Wrapper>
    ),
    [description, name, props, text, urlImg]
  );

  if (urlRedirect) {
    return <Link href={urlRedirect ?? ''}>{content}</Link>;
  }

  return content;
}

import { AddOutlined, ExtensionOutlined, VisibilityOutlined } from '@mui/icons-material'

import { IconButton } from 'shared/components/icon-button'

import * as S from './styles'

type Props = {
  title: string;
  subtitle: string;
  description: string;
  headerTitle: string;
  footerTitle: string;
}

export const CardsInfo: React.FC<Props> = ({ title, subtitle, description, footerTitle, headerTitle }) => {
  return (
    <S.Wrapper>
      <S.Card>
        <S.Content>
          <S.Subtitle>{headerTitle}</S.Subtitle>

          <S.Title>{title}</S.Title>
          <S.Subtitle>{subtitle}</S.Subtitle>

          <S.Description>{description}</S.Description>
        </S.Content>

        <S.Actions>
          <S.Caption>{footerTitle}</S.Caption>

          <div>
            <IconButton icon={VisibilityOutlined} tooltip="Ver processos" />
            <IconButton icon={AddOutlined} tooltip="Novo processos" />
            <IconButton icon={ExtensionOutlined} tooltip="Ver diagrama" />
          </div>
        </S.Actions>
      </S.Card>
    </S.Wrapper>
  )
}
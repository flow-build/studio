import { useNavigate } from 'react-router-dom'
import { AddOutlined, ExtensionOutlined, VisibilityOutlined } from '@mui/icons-material'

import { TWorkflow } from 'models/workflow'

import { IconButton } from 'shared/components/icon-button'
import { getLongFormatByDate } from 'shared/utils/date'

import * as S from './styles'

type Props = {
  data: TWorkflow[]
}

export const Table: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate()

  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableCell>Name</S.TableCell>
            <S.TableCell>ID</S.TableCell>
            <S.TableCell>Description</S.TableCell>
            <S.TableCell>Version</S.TableCell>
            <S.TableCell>Created at</S.TableCell>
            <S.TableCell>Actions</S.TableCell>
          </S.TableRow>
        </S.TableHead>

        <S.TableBody>
          {data.map(dataItem => (
            <S.TableRow key={dataItem.workflow_id}>
              <S.TableCell>{dataItem.name}</S.TableCell>
              <S.TableCell>{dataItem.workflow_id}</S.TableCell>
              <S.TableCell>{dataItem.description}</S.TableCell>
              <S.TableCell>{dataItem.version}</S.TableCell>
              <S.TableCell>{getLongFormatByDate(dataItem.created_at)}</S.TableCell>
              <S.TableCell>
                <IconButton
                  icon={VisibilityOutlined}
                  tooltip="Ver processos"
                  onClick={() => navigate(`${dataItem.workflow_id}/processes`)}
                />
                <IconButton icon={AddOutlined} tooltip="Novo processos" />
                <IconButton
                  icon={ExtensionOutlined}
                  tooltip="Ver diagrama"
                  onClick={() => navigate(`${dataItem.workflow_id}/diagram`)}
                />
              </S.TableCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
    </S.Wrapper>
  )
}
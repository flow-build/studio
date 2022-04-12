// import { useNavigate } from 'react-router-dom'
import { ExtensionOutlined, VisibilityOutlined } from '@mui/icons-material'

import { TProcess } from 'models/process'

import { IconButton } from 'shared/components/icon-button'
import { getLongFormatByDate } from 'shared/utils/date'

import * as S from './styles'

type Props = {
  data: TProcess[]
}

export const Table: React.FC<Props> = ({ data }) => {
  // const navigate = useNavigate()

  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableCell>Name</S.TableCell>
            <S.TableCell>ID</S.TableCell>
            <S.TableCell>Status</S.TableCell>
            <S.TableCell>Created at</S.TableCell>
            <S.TableCell>Actions</S.TableCell>
          </S.TableRow>
        </S.TableHead>

        <S.TableBody>
          {data.map(dataItem => (
            <S.TableRow key={dataItem.id}>
              <S.TableCell>{dataItem.state.node_name}</S.TableCell>
              <S.TableCell>{dataItem.id}</S.TableCell>
              <S.TableCell>{dataItem.status}</S.TableCell>
              <S.TableCell>{getLongFormatByDate(dataItem.created_at)}</S.TableCell>
              <S.TableCell>
                <IconButton
                  icon={VisibilityOutlined}
                  tooltip="Ver processos"
                // onClick={() => navigate(`${dataItem.workflow_id}`)}
                />

                <IconButton
                  icon={ExtensionOutlined}
                  tooltip="Ver diagrama"
                // onClick={() => navigate(`${dataItem.workflow_id}/diagram`)}
                />
              </S.TableCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
    </S.Wrapper>
  )
}
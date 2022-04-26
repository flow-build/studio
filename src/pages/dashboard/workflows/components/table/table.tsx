import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddOutlined, ExtensionOutlined, VisibilityOutlined } from '@mui/icons-material'
import { useSnackbar } from 'notistack';

import { TWorkflow } from 'models/workflow'

import { IconButton } from 'shared/components/icon-button'
import { getLongFormatByDate } from 'shared/utils/date'

import * as S from './styles'
import { createProcessByName } from 'services/resources/processes/create-by-name';

type Props = {
  data: TWorkflow[]
}

export const Table: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar();

  const showNotification = useCallback((message: string) => {
    enqueueSnackbar(
      `Processo ${message} criado!`,
      { autoHideDuration: 2000, variant: 'success' }
    );
  }, [enqueueSnackbar])

  const onCreateProcess = useCallback(async (processName: string, workflowId: string) => {
    try {
      const response = await createProcessByName(processName);
      showNotification(processName);
      navigate(`${workflowId}/processes/${response.process_id}/history`)
    } catch (error) {
      console.error(error)
    }

  }, [navigate, showNotification])

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
                <IconButton
                  icon={AddOutlined}
                  tooltip="Novo processos"
                  onClick={() => onCreateProcess(dataItem.name, dataItem.workflow_id)}
                />
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
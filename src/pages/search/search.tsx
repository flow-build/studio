import { SearchOutlined } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { setSearchProcessIdDialog, setSearchProcessIdDialogData } from 'pages/diagram/features/bpmnSlice'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listStatesByProcessId } from 'services/resources/processes/list-states'
import * as S from './styles'

type Props = {}

export const Search: React.FC<Props> = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar();

  const [payload, setPayload] = useState({ processId: '' })

  const onChangeSearchInput = (evt: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPayload(prev => ({ ...prev, processId: evt.target.value }))
  }

  const handleSearch = async () => {
    try {
      const response = await listStatesByProcessId(payload.processId)

      /* TODO: Remover legacy code */
      dispatch(setSearchProcessIdDialogData(response))
      dispatch(setSearchProcessIdDialog(true))

      navigate(`/dashboard/workflows/${response.workflow_id}/diagram`)
    } catch (error: any) {
      enqueueSnackbar(
        'UUID Inválido',
        { autoHideDuration: 2000, variant: 'error' }
      );
    }
  }

  return (
    <S.Wrapper>
      <Typography variant="h5" component="h2" sx={{ marginBottom: 4 }}>
        Busque um diagrama pelo Process ID
      </Typography>

      <TextField
        id="outlined-required"
        label="Process ID"
        onChange={onChangeSearchInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={handleSearch}
              >
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </S.Wrapper>
  )
}


/* */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'

import _isEmpty from 'lodash/isEmpty'

import { TState } from 'models/state'

import * as S from './styles'

type Props = {
  state: TState;
}

export const CollapseContent: React.FC<Props> = ({ state }) => {
  if (_isEmpty(state.result)) {
    return (
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" component="p" gutterBottom >Result</Typography>
        <Typography variant='caption' component='p'>No result data...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" component="p" gutterBottom>Result</Typography>
      <S.Table size='small' aria-label='result'>
        <S.TableHead>
          <S.TableRow>
            <S.TableCell>Key</S.TableCell>
            <S.TableCell>Value</S.TableCell>
          </S.TableRow>
        </S.TableHead>
        <S.TableBody>
          {
            Object.keys(state?.result).map((key: any, index) => (
              <S.TableRow key={index}>
                <S.TableCell>{key}</S.TableCell>
                <S.TableCell>{JSON.stringify(state.result[key])}</S.TableCell>
              </S.TableRow>
            ))
          }
        </S.TableBody>
      </S.Table>
    </Box>
  )
}
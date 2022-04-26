import React, { useCallback, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'

import _isEmpty from 'lodash/isEmpty'

import { TState } from 'models/state'

import { IconButton } from 'shared/components/icon-button'

import { getLongFormatByDate } from 'shared/utils/date'


import * as S from './styles'

type Props = {
  data: TState[]
}

const TableBody: React.FC<{ dataItem: TState }> = ({ dataItem }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

  const icon = useMemo(() => {
    if (isCollapseOpen) {
      return () => <KeyboardArrowUp />
    }
    return () => <KeyboardArrowDown />
  }, [isCollapseOpen])

  const onPressCollapse = useCallback(() => {
    setIsCollapseOpen(!isCollapseOpen)
  }, [isCollapseOpen])

  return (
    <React.Fragment>
      <S.TableRow /* sx={{ '& > *': { borderBottom: 'unset' } }} */ >
        <S.TableCell>
          <IconButton icon={icon} onClick={onPressCollapse} />
        </S.TableCell>
        <S.TableCell>{dataItem.id}</S.TableCell>
        <S.TableCell>{dataItem.node_id}</S.TableCell>
        <S.TableCell>{dataItem.next_node_id || "null"}</S.TableCell>
        <S.TableCell>{dataItem.status}</S.TableCell>
        <S.TableCell>{getLongFormatByDate(dataItem.created_at)}</S.TableCell>
      </S.TableRow>

      {isCollapseOpen && !_isEmpty(dataItem.result) && (
        <S.TableRow>
          <S.TableCell colSpan={6}>
            <Collapse in={true} timeout="auto" component="div" >
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
                      Object.keys(dataItem?.result).map((key: any, index) => (
                        <S.TableRow key={index}>
                          <S.TableCell>{key}</S.TableCell>
                          <S.TableCell>{JSON.stringify(dataItem.result[key])}</S.TableCell>
                        </S.TableRow>
                      ))
                    }
                  </S.TableBody>
                </S.Table>
              </Box>
            </Collapse>
          </S.TableCell>
        </S.TableRow>
      )}

      {isCollapseOpen && _isEmpty(dataItem.result) && (
        <S.TableRow>
          <S.TableCell colSpan={6}>
            <Collapse in={true} timeout="auto" component="div">
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" component="p" gutterBottom >Result</Typography>
                <Typography variant='caption' component='p'>No result data...</Typography>
              </Box>
            </Collapse>
          </S.TableCell>
        </S.TableRow>
      )}
    </React.Fragment>
  )
}

export const Table: React.FC<Props> = ({ data }) => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableCell />
            <S.TableCell>ID</S.TableCell>
            <S.TableCell>Node</S.TableCell>
            <S.TableCell>Next node</S.TableCell>
            <S.TableCell>Status</S.TableCell>
            <S.TableCell>Created at</S.TableCell>
          </S.TableRow>
        </S.TableHead>

        <S.TableBody>
          {data.map(dataItem => (<TableBody key={dataItem.id} dataItem={dataItem} />))}
        </S.TableBody>
      </S.Table>
    </S.Wrapper >
  )
}
import styled from 'styled-components';

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

export const Wrapper = styled(Button)``

export const Loading = styled(CircularProgress).attrs({
    size: 20,
    color: "inherit",
})``
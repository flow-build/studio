import { createTheme } from '@mui/material/styles'
import { CustomColorPalette } from 'utils/statusColors';


export const themeDefault = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2D77EF',
            light: '#79B2FF',
            dark: '#0046A6'
        },
        secondary: {
            main: '#000000',
            light: '#3D3D3D'
        },
        error: {
            main: '#EB5757'
        },
        warning: {
            main: '#E2B93B'
        },
        success: {
            main: '#27AE60'
        },
        grey: {
            100: '#FFFFFF',
            200: '#F3F3F4',
            300: '#BABAC1',
            400: '#83838C',
            500: '#4B4B57',
            600: '#1E1E2D',
            700: '#151521'
        },
        background: {
            default: '#151521',
            paper: '#1E1E2D'
        },
		...CustomColorPalette
    },
});

console.dir(themeDefault);


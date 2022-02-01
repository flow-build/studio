import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { getStorageItem } from 'utils/storage'

import { Box } from '@mui/material'
import { Header, Sidebar } from 'components'

const Layout = () => {
    const location = useLocation()
    
    if(!getStorageItem('TOKEN')) return <Navigate to='/login' state={{ from: location }} replace />

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateAreas: ` 
                    'header header'
                    'sidebar content'`,
                gridTemplateColumns: '280px calc(100% - 280px)',
                gridTemplateRows: '64px calc(100vh - 64px)',
                minHeight: '100vh',
                maxWidth: '100%',
                overflow: 'hidden',
                background: (theme) => theme.palette.background.default                
            }}
        >
            <Header />
            <Sidebar />
            <Box
                sx={{
                    gridArea: 'content',
                    padding: '10px',
                    overflowY: 'scroll'
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout

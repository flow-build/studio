import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import LogoUrl from 'assets/images/flowbuildstudio_bg_dark.png'
import { removeStorageItem } from 'utils/storage'

import {
    Avatar,  
    Box, 
    Container,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,  
    Toolbar, 
    Tooltip,
    Typography 
} from '@mui/material'
import { PersonAdd, Settings, Logout } from '@mui/icons-material'

const Header = () => {
    const [isProfileOptionsOpen, setIsProfileOptionsOpen] = useState(null)

    const navigate = useNavigate()

    const handleOpenProfileOptions = (event) => {
        setIsProfileOptionsOpen(event.currentTarget)
    }

    const handleCloseProfileOptions = () => setIsProfileOptionsOpen(null)

    const handleLogout = async() => {
        await removeStorageItem('TOKEN')

        navigate('/login')
    }

    return (
        <Box sx={{ gridArea: 'header', background: (theme) => theme.palette.background.paper }}>
            <Container maxWidth='x1' disableGutters sx={{ pl: '10px', pr: '10px' }}>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between'}}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            width: '180px',
                            '& img': {
                                maxWidth: '100%'
                            }
                        }}
                    >
                        <Link to="/">
                            <img src={LogoUrl} alt="Flowbuild" />
                        </Link>
                    </Box>
                    <Box>
                        <Tooltip title="Profile Options">
                            <IconButton onClick={handleOpenProfileOptions} sx={{ p: 0 }}>
                                <Avatar alt="Brad Gibson" src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id='profile-options'
                            keepMounted
                            anchorEl={isProfileOptionsOpen}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(isProfileOptionsOpen)}
                            onClose={handleCloseProfileOptions}
                            sx={{ mt: '45px' }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                <Typography>Profile</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                <Typography>Settings</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                <Typography>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </Box>
    )
}

export default Header
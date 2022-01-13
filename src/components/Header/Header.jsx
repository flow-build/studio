import React from 'react'

import {
  IoPersonOutline,
  IoWalletOutline,
  IoSettingsOutline,
  IoLogOutOutline
 } from 'react-icons/io5'

import { Avatar, Dropdown, Logo, ProfileMenu } from 'components'

import * as S from './styles'

const Header = () => (
    <S.Header>
        <S.LogoArea>
            <Logo />
        </S.LogoArea>
        <S.TopNav>
            <Dropdown
                Toogle={<Avatar name="Brad Gibson" src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />}
            >
                <ProfileMenu to="/" Icon={<IoPersonOutline />} content="Profile" />
                <ProfileMenu to="/" Icon={<IoWalletOutline />} content="My Wallet" />
                <ProfileMenu to="/" Icon={<IoSettingsOutline />} content="Settings" />
                <ProfileMenu to="/" Icon={<IoLogOutOutline />} content="Logout" />
            </Dropdown>
        </S.TopNav>
    </S.Header>
)

export default Header
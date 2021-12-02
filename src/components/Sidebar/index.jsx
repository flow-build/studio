import React, { useState, useEffect } from 'react'

import { getWorkflows } from '../../services/workflowService'

import Logo from '../Logo'
import ListItem from '../ListItem'

import * as S from './styles'

const Sidebar = () => {
    const [workflows, setWorkflows] = useState([])

    const handleGetWorkflows = async () => {
        try {
            const workflows = await getWorkflows()

            setWorkflows(workflows)
        } catch(e) {
            console.error('Sidebar/handleGetWorkflows: ', e.message)
        }
    }

    useEffect(() => {
        handleGetWorkflows()
    }, [])

    console.log('Sidebar/state:workflows: ', workflows)

    return (
        <S.Wrapper>
            <Logo />
            <S.List>
                {workflows?.map((workflow) => (
                    <ListItem item={workflow} key={workflow?.hash} />
                ))}
            </S.List>
        </S.Wrapper>
    )
}

export default Sidebar
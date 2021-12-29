import React, { useEffect, useState } from 'react'

import DiagramProperties from '../DiagramProperties'

import * as S from './styles'

const DiagramElement = ({ modeler }) => {
    const [element, setElement] = useState(null)
    const [sElements, setSElements] = useState([])

    useEffect(() => {
        if(!modeler)  return;

        modeler.on('selection.changed', (e) => {
            setElement(e.newSelection[0])
            setSElements(e.newSelection)
        });

        modeler.on('element.changed', (e) => {
            if(!element) return;

            if(e?.element?.id === element?.id) {
                setElement(e.element)
            }
        })
    }, [modeler, element])

    console.log('Element: ', element)
    
    return (
        <S.DiagramElement>
            {
                sElements?.length === 1 && <DiagramProperties modeler={modeler} element={element} />
            }
            {
                sElements?.length === 0 && <span>Por favor, selecione um elemento.</span>
            }
            {
                sElements?.length > 1 && <span>Por favor, selecione um unico elemento.</span>
            }
        </S.DiagramElement>
    )
}

export default DiagramElement
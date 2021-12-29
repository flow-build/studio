import React, { useState, useRef } from 'react'
import axios from 'axios'
import Modeler from 'bpmn-js/lib/Modeler'
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import DiagramElement from '../DiagramElement'

import * as S from './styles'

const Diagram = () => {
    const [modeler, setModeler] = useState(null)

    const container = useRef(null)

    const handleUploadFile = async ({ target }) => {
      if(!target.files) return

      Array.from(target.files)?.forEach((file) => handleSetModeler(URL.createObjectURL(file)))
    }

    const handleFileURL = async({ target }) => {
      if(!target.value) return

      await handleSetModeler(target.value)
    }

    const handleSetModeler = async (value) => {
      if(!value) return

      if(modeler) {
        console.log("Destroy")
        modeler.destroy()
      }

      try {
          const { data } = await axios.get(value)
          
          const modeler = new Modeler({
              container: container.current,
              moddleExtensions: {
                  custom: {
                      "name": "custom",
                      "uri": "http://custom/ns",
                      "associations": [],
                      "types": [
                        {
                          "name": "WorkflowInfo",
                          "extends": [
                            "bpmn:ServiceTask",
                            "bpmn:UserTask",
                            "bpmn:StartEvent",
                            "bpmn:EndEvent",
                            "bpmn:ExclusiveGateway"
                          ],
                          "properties": [
                            {
                              "name": "lane_id",
                              "isAttr": true,
                              "type": "String"
                            },
                            {
                              "name": "category",
                              "isAttr": true,
                              "type": "String"
                            },
                            {
                              "name": "parameters",
                              "isAttr": true,
                              "type": "String"
                            }
                          ]
                        },
                        {
                          "name": "WorkflowLane",
                          "extends": [
                            "bpmn:Lane"
                          ],
                          "properties": [
                            {
                              "name": "rule",
                              "isAttr": true,
                              "type": "String"
                            }
                          ]
                        }
                      ],
                      "prefix": "custom",
                      "xml": {
                        "tagAlias": "lowerCase"
                      }
                    }
              },
              keyboard: {
                  bindTo: document.body
              }
          })

          setModeler(modeler)

          modeler.importXML(data)
      } catch(e) {
          throw new Error(`Diagram/handleSetModeler => ${e.error}: ${e.message}`)
      }
    }

    const handleOnSaveXML = async () => {
      const { xml } = await modeler.saveXML()

      if(!xml) return
      const canvas = modeler.get('canvas')
      const blob = new Blob([xml], { type: 'xml'})
      const link = document.createElement('a');
      link.setAttribute('href', URL.createObjectURL(blob))
      link.setAttribute('download', canvas.getRootElement().businessObject['id' || 'name'])

      link.style.display = 'none';

      link.click()
    }

    return (
        <S.Diagram>
          <S.SearchBar>
            <S.Input type="text" placeholder="Insira a URL do diagrama..." onChange={handleFileURL} />
          </S.SearchBar>
          <S.SearchBar>
            <S.Input type="file" onChange={handleUploadFile} />
          </S.SearchBar>
           
          <S.Canvas ref={container} />
          <DiagramElement modeler={modeler} />
          <button onClick={handleOnSaveXML}>Download XML</button>
        </S.Diagram>
    )
}

export default Diagram
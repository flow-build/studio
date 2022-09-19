import { useState } from "react";

import { ICreateDiagram } from "pages/diagram/dialogs/save-diagram/types/ICreateDiagram";

import * as S from "./styles";
import { create } from "services/resources/diagrams/create";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SaveDiagram: React.FC<Props> = ({ isOpen, onClose }) => {
  const [update, setUpdate] = useState<ICreateDiagram>({
    name: "",
    workflowId: "5dbe5ef7-1158-44ea-a148-6ad5b2d78cb1",
    userId: "e9f53410-35e4-11ed-983d-9315e6682be4",
    xml: `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:color="http://www.omg.org/spec/BPMN/non-normative/color/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI">
        <bpmn:process id="Global_Process" isExecutable="true">
            <bpmn:laneSet id="Global_LaneSet">
                <bpmn:lane id="Lane_1" name="the_only_lane">
                    <bpmn:flowNodeRef>Node_1</bpmn:flowNodeRef>
                    <bpmn:flowNodeRef>Node_2</bpmn:flowNodeRef>
                    <bpmn:flowNodeRef>Node_3</bpmn:flowNodeRef>
                </bpmn:lane>
            </bpmn:laneSet>
            <bpmn:startEvent xmlns:custom="http://custom/ns" id="Node_1" name="Start node" custom:parameters="{&#39;input_schema&#39;:{}}">
                <bpmn:outgoing>Flow_1_2</bpmn:outgoing>
            </bpmn:startEvent>
            <bpmn:userTask xmlns:custom="http://custom/ns" id="Node_2" name="User Task node" custom:parameters="{&#39;input&#39;:{},&#39;action&#39;:&#39;do something&#39;}">
                <bpmn:incoming>Flow_1_2</bpmn:incoming>
                <bpmn:outgoing>Flow_2_3</bpmn:outgoing>
            </bpmn:userTask>
            <bpmn:endEvent xmlns:custom="http://custom/ns" id="Node_3" name="Finish node" custom:parameters="{}">
                <bpmn:incoming>Flow_2_3</bpmn:incoming>
            </bpmn:endEvent>
            <bpmn:sequenceFlow id="Flow_1_2" sourceRef="Node_1" targetRef="Node_2" />
            <bpmn:sequenceFlow id="Flow_2_3" sourceRef="Node_2" targetRef="Node_3" />
        </bpmn:process>
        <bpmn:collaboration id="Global_Colab" workflowId="3f741010-9896-11ec-8680-1d46a1258aed">
            <bpmn:participant id="Global_Actor" name="user_task" processRef="Global_Process" />
        </bpmn:collaboration>
        <bpmndi:BPMNDiagram id="Global_Diagram">
            <bpmndi:BPMNPlane id="Global_Plane" bpmnElement="Global_Colab">
                <bpmndi:BPMNShape id="Node_1_di" bpmnElement="Node_1">
                    <dc:Bounds x="114" y="72" width="36" height="36" />
                </bpmndi:BPMNShape>
                <bpmndi:BPMNShape id="Node_2_di" bpmnElement="Node_2" bioc:stroke="#1e88e5" bioc:fill="#bbdefb" color:background-color="#bbdefb" color:border-color="#1e88e5">
                    <dc:Bounds x="180" y="50" width="100" height="80" />
                </bpmndi:BPMNShape>
                <bpmndi:BPMNShape id="Node_3_di" bpmnElement="Node_3">
                    <dc:Bounds x="310" y="72" width="36" height="36" />
                </bpmndi:BPMNShape>
                <bpmndi:BPMNEdge id="Flow_1_2_di" bpmnElement="Flow_1_2">
                    <di:waypoint x="150" y="90" />
                    <di:waypoint x="160" y="90" />
                    <di:waypoint x="160" y="90" />
                    <di:waypoint x="180" y="90" />
                </bpmndi:BPMNEdge>
                <bpmndi:BPMNEdge id="Flow_2_3_di" bpmnElement="Flow_2_3">
                    <di:waypoint x="280" y="90" />
                    <di:waypoint x="290" y="90" />
                    <di:waypoint x="290" y="90" />
                    <di:waypoint x="310" y="90" />
                </bpmndi:BPMNEdge>
                <bpmndi:BPMNShape id="Lane_1_di" bpmnElement="Lane_1">
                    <dc:Bounds x="80" y="10" width="360" height="160" />
                </bpmndi:BPMNShape>
                <bpmndi:BPMNShape id="Global_Actor_di" bpmnElement="Global_Actor">
                    <dc:Bounds x="50" y="10" width="390" height="160" />
                </bpmndi:BPMNShape>
            </bpmndi:BPMNPlane>
        </bpmndi:BPMNDiagram>
    </bpmn:definitions>`,
  });

  const onChangeDiagramName = (
    valor: string,
    campo: "name" | "workflowId" | "userId" | "xml"
  ) => {
    setUpdate((prev) => ({ ...prev, [campo]: valor }));
  };

  async function handleClickDiagramName() {
    console.log(update);

    const response = await create({
      name: update.name,
      workflowId: update.workflowId,
      userId: update.userId,
      xml: update.xml,
    });
    console.log(response, "response");
    return;
  }

  return (
    <S.DiagramWrapper open={isOpen} onClose={onClose}>
      <S.DiagramTitle>
        Salvar Diagrama
        <S.CloseDiagramButton onClick={onClose} />
      </S.DiagramTitle>
      <S.DiagramContent>
        <S.DiagramInput
          value={update?.name}
          onChange={(event) => {
            onChangeDiagramName(event.target.value, "name");
          }}
        />
      </S.DiagramContent>
      <S.DiagramDivider />
      <S.ButtonWrapper>
        <S.CancelDiagramButton onClick={onClose}>
          {" "}
          Cancelar{" "}
        </S.CancelDiagramButton>
        <S.ButtonDivider />
        <S.SaveDiagramButton onClick={handleClickDiagramName}>
          {" "}
          Salvar
        </S.SaveDiagramButton>
      </S.ButtonWrapper>
    </S.DiagramWrapper>
  );
};

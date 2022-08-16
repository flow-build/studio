import { useState } from "react";
import { healthcheck } from "services/resources/settings";
import * as S from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { setMqttHost, setMqttPort } from "store/slices/settings";
import { RootState } from "store";

interface IPayload {
  mqttServerUrl: string;
  mqttServerPort: string;
}

export const FormMqtt: React.FC<{}> = () => {
  const [formSettingsData, setFormSettingsData] = useState<IPayload>({
    mqttServerUrl: "",
    mqttServerPort: "",
  });
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.settings);
  console.log("store", store);

  function onChangeState(value: string, field: keyof IPayload) {
    setFormSettingsData((state) => ({ ...state, [field]: value }));
  }

  function saveSettings() {
    dispatch(setMqttHost(formSettingsData.mqttServerUrl));
    dispatch(setMqttPort(formSettingsData.mqttServerPort));
  }

  const [formMqtt, setMqtt] = useState<any>(null);

  const handleSubmit = async (
    e: any,
    type: string,
    message: string,
    url: string,
    port: string
  ) => {
    try {
      e.preventDefault();
      const response = await healthcheck(url, port);
      type === "mqtt" && setMqtt(true);
      message === "check" && setMqtt(true);
      if (response?.mqtt?.status) {
        saveSettings();
      }
      console.log("response", response);
    } catch (error: any) {
      type === "mqtt" && setMqtt(false);
      message === "check" && setMqtt(false);
      console.error(error);
    }
  };

  function checkDisabledFormMqtt() {
    if (
      formSettingsData.mqttServerUrl !== "" &&
      formSettingsData.mqttServerPort !== ""
    )
      return false;
    else {
      return true;
    }
  }

  return (
    <S.FormMqtt
      onSubmit={(e) => {
        handleSubmit(
          e,
          "mqtt",
          "check",
          formSettingsData.mqttServerUrl,
          formSettingsData.mqttServerPort
        );
      }}
    >
      <S.ContainerMqtt>
        <S.InputMQTTServerURL
          value={formSettingsData.mqttServerUrl}
          onChange={(e) => onChangeState(e.target.value, "mqttServerUrl")}
        />
        <S.InputMQTTServerPort
          value={formSettingsData.mqttServerPort}
          onChange={(e) => onChangeState(e.target.value, "mqttServerPort")}
        />
        <S.SubmitButton type="submit" disabled={checkDisabledFormMqtt()}>
          Enviar
        </S.SubmitButton>
        {formMqtt !== null &&
          (formMqtt ? (
            <>
              <S.IconSuccess />
              <S.Paragraph>Sucesso ao conectar</S.Paragraph>
            </>
          ) : (
            <>
              <S.IconError />
              <S.Paragraph>Erro ao conectar</S.Paragraph>
            </>
          ))}
      </S.ContainerMqtt>
    </S.FormMqtt>
  );
};

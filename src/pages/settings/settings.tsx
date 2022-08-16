import { useState } from "react";
import { healthcheck } from "services/resources/settings";
import * as S from "./styles";

import { useSnackbar } from "notistack";

import { useDispatch, useSelector } from "react-redux";
import {
  setFlowbuildHost,
  setFlowbuildPort,
  setMqttHost,
  setMqttPort,
} from "store/slices/settings";
import { RootState } from "store";

interface IPayload {
  serverUrl: string;
  serverPort: string;
  mqttServerUrl: string;
  mqttServerPort: string;
}

export const Settings: React.FC<{}> = () => {
  const [formSettingsData, setFormSettingsData] = useState<IPayload>({
    serverUrl: "",
    serverPort: "",
    mqttServerUrl: "",
    mqttServerPort: "",
  });
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.settings);
  console.log("store", store);
  const { enqueueSnackbar } = useSnackbar();

  function onChangeState(value: string, field: keyof IPayload) {
    setFormSettingsData((state) => ({ ...state, [field]: value }));
  }

  function saveSettings() {
    dispatch(setFlowbuildHost(formSettingsData.serverUrl));
    dispatch(setFlowbuildPort(formSettingsData.serverPort));
    dispatch(setMqttHost(formSettingsData.mqttServerUrl));
    dispatch(setMqttPort(formSettingsData.mqttServerPort));
  }

  const [formServer, setFormServer] = useState<any>(null);
  const [formMqtt, setMqtt] = useState<any>(null);

  const handleSubmit = async (e: any, type: string, message: string) => {
    try {
      e.preventDefault();
      const response = await healthcheck();
      type === "server" ? setFormServer(true) : setMqtt(true);
      message === "status" ? setFormServer(true) : setMqtt(true);
      if (response?.mqtt?.status) {
        saveSettings();
      }
      console.log("response", response);
    } catch (error: any) {
      type === "server" ? setFormServer(false) : setMqtt(false);
      message === "status" ? setFormServer(false) : setMqtt(false);
      enqueueSnackbar(error.message, {
        variant: "error",
      });
      console.error(error);
    }
  };

  function checkDisabledFormServer() {
    if (formSettingsData.serverUrl !== "" && formSettingsData.serverPort !== "")
      return false;
    else {
      return true;
    }
  }

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
    <S.Container>
      <S.Title>Configurações</S.Title>

      <S.FormServer
        onSubmit={(e) => {
          handleSubmit(e, "server", "status");
        }}
      >
        <S.ContainerServer>
          <S.InputServerURL
            value={formSettingsData.serverUrl}
            onChange={(e) => onChangeState(e.target.value, "serverUrl")}
          />

          <S.InputServerPort
            value={formSettingsData.serverPort}
            onChange={(e) => onChangeState(e.target.value, "serverPort")}
          />

          <S.SubmitButton type="submit" disabled={checkDisabledFormServer()}>
            Enviar
          </S.SubmitButton>

          {formServer !== null &&
            (formServer ? (
              <>
                <S.IconSuccess />
                <S.P>Sucesso ao conectar</S.P>
              </>
            ) : (
              <>
                <S.IconError />
                <S.P>Erro ao conectar</S.P>
              </>
            ))}
        </S.ContainerServer>
      </S.FormServer>

      <S.FormMqtt
        onSubmit={(e) => {
          handleSubmit(e, "mqtt", "check");
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
                <S.P>Sucesso ao conectar</S.P>
              </>
            ) : (
              <>
                <S.IconError />
                <S.P>Erro ao conectar</S.P>
              </>
            ))}
        </S.ContainerMqtt>
      </S.FormMqtt>
    </S.Container>
  );
};

// function REACT_APP_FLOWBUILD_HOST(REACT_APP_FLOWBUILD_HOST: any): {
//   payload: any;
//   type: string;
// } {
//   throw new Error("Function not implemented.");
// }

import { useState } from "react";
import { healthcheck } from "services/resources/settings";
import * as S from "./styles";

// import { useSnackbar } from "notistack";
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

  function onChangeState(value: string, field: keyof IPayload) {
    setFormSettingsData((state) => ({ ...state, [field]: value }));
  }

  function saveSettings() {
    dispatch(setFlowbuildHost(formSettingsData.serverUrl));
    dispatch(setFlowbuildPort(formSettingsData.serverPort));
    dispatch(setMqttHost(formSettingsData.mqttServerUrl));
    dispatch(setMqttPort(formSettingsData.mqttServerPort));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await healthcheck();
    console.log("response", response);
    saveSettings();
  };

  function checkDisabled() {
    if (
      formSettingsData.serverUrl !== "" &&
      formSettingsData.serverPort !== "" &&
      formSettingsData.mqttServerUrl !== "" &&
      formSettingsData.mqttServerPort !== ""
    )
      return false;
    else {
      return true;
    }
  }

  // function reducersDispatchs() {
  //       dispatch(setFlowbuildHost())
  //       dispatch(setFlowbuildPort())
  //       dispatch(setMqttHost())
  //       dispatch(setMqttPort())
  // };

  return (
    <S.Container>
      <S.Title>Configurações</S.Title>

      <S.FormInputs
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <S.InputServerURL
          value={formSettingsData.serverUrl}
          onChange={(e) => onChangeState(e.target.value, "serverUrl")}
        />

        <S.InputServerPort
          value={formSettingsData.serverPort}
          onChange={(e) => onChangeState(e.target.value, "serverPort")}
        />

        <S.InputMQTTServerURL
          value={formSettingsData.mqttServerUrl}
          onChange={(e) => onChangeState(e.target.value, "mqttServerUrl")}
        />

        <S.InputMQTTServerPort
          value={formSettingsData.mqttServerPort}
          onChange={(e) => onChangeState(e.target.value, "mqttServerPort")}
        />
        <S.SubmitButton type="submit" disabled={checkDisabled()}>
          Enviar
        </S.SubmitButton>
      </S.FormInputs>
    </S.Container>
  );
};
function REACT_APP_FLOWBUILD_HOST(REACT_APP_FLOWBUILD_HOST: any): {
  payload: any;
  type: string;
} {
  throw new Error("Function not implemented.");
}

import { useState } from "react";
import { healthcheck } from "services/resources/settings";
import * as S from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { setFlowbuildHost, setFlowbuildPort } from "store/slices/settings";
import { RootState } from "store";

interface IPayload {
  serverUrl: string;
  serverPort: string;
}

export const FormServer: React.FC<{}> = () => {
  const [formSettingsData, setFormSettingsData] = useState<IPayload>({
    serverUrl: "",
    serverPort: "",
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
  }

  const [formServer, setFormServer] = useState<any>(null);

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

      type === "server" && setFormServer(true);
      message === "status" && setFormServer(true);
      if (response?.mqtt?.status) {
        saveSettings();
      }
      console.log("response", response);
    } catch (error: any) {
      type === "server" && setFormServer(false);
      message === "status" && setFormServer(false);
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

  return (
    <S.FormServer
      onSubmit={(e) => {
        handleSubmit(
          e,
          "server",
          "status",
          formSettingsData.serverUrl,
          formSettingsData.serverPort
        );
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
              <S.Paragraph>Sucesso ao conectar</S.Paragraph>
            </>
          ) : (
            <>
              <S.IconError />
              <S.Paragraph>Erro ao conectar</S.Paragraph>
            </>
          ))}
      </S.ContainerServer>
    </S.FormServer>
  );
};


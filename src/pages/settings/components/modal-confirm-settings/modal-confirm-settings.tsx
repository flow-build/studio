import * as S from "./styles";
import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { settingsSlice } from "store/slices/settings";
import {
  setFlowbuildHost,
  setFlowbuildPort,
  setMqttHost,
  setMqttPort,
} from "store/slices/settings";
import { getAnonymousToken } from "services/resources/token";
import { setStorageItem } from "shared/utils/storage";

export const ModalConfirmSettings: React.FC<{}> = () => {
  const store = useSelector((state: RootState) => state.settings);
  console.log("store", store);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //  function onSubmit() {
  // - substituir o baseURL e port do flowbuild e do MQTT; => saveSettings
  // - trocar a baseURL da api pro novo do flowbuild; =>
  // - substituir o token; => getAnonymousToken
  // }
  const [formSettingsData, setFormSettingsData] = useState({
    serverUrl: "",
    serverPort: "",
    mqttServerUrl: "",
    mqttServerPort: "",
  });

  const dispatch = useDispatch();

  function saveSettings() {
    dispatch(setFlowbuildHost(formSettingsData.serverUrl));
    dispatch(setFlowbuildPort(formSettingsData.serverPort));
    dispatch(setMqttHost(formSettingsData.mqttServerUrl));
    dispatch(setMqttPort(formSettingsData.mqttServerPort));
  }

  const handleSubmit = async () => {
    saveSettings();
    getAnonymousToken();
    // setStorageItem({
    //   "serverUrl" : formSettingsData.serverUrl,
    //   // "serverPort": store.REACT_APP_FLOWBUILD__PORT,
    //   // "mqttServerUrl": store.REACT_APP_MQTT_HOST,
    //   // "mqttServerPort": store.REACT_APP_MQTT_PORT,
    // }
    // );
  };

  // function checkDisabledConfirm() {
  //   if (
  //     store.REACT_APP_FLOWBUILD_HOST !== "" &&
  //     store.REACT_APP_FLOWBUILD__PORT !== "" &&
  //     store.REACT_APP_MQTT_HOST !== "" &&
  //     store.REACT_APP_MQTT_PORT !== ""
  //   )
  //     return false;
  //   else {
  //     return true;
  //   }
  // }

  return (
    <S.ModalContent>
      <S.ButtonModal onClick={handleClickOpen}>Confirme os dados</S.ButtonModal>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Confirme os dados"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <S.FlowbuildData>
              <S.Paragraph>
                URL do servidor do Flowbuild: {store.REACT_APP_FLOWBUILD_HOST}
              </S.Paragraph>
              <S.Paragraph>
                Porta do Flowbuild: {store.REACT_APP_FLOWBUILD__PORT}
              </S.Paragraph>
            </S.FlowbuildData>
            <S.MqttData>
              <S.Paragraph>
                URL do servidor do MQTT: {store.REACT_APP_MQTT_HOST}
              </S.Paragraph>
              <S.Paragraph>
                Porta do MQTT: {store.REACT_APP_MQTT_PORT}
              </S.Paragraph>
            </S.MqttData>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
            // disabled={checkDisabledConfirm()}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </S.ModalContent>
  );
};

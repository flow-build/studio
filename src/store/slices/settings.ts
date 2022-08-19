import { createSlice } from "@reduxjs/toolkit";
import { setStorageItem } from "shared/utils/storage";

const SETTINGS = {
  REACT_APP_FLOWBUILD_HOST: "",
  REACT_APP_FLOWBUILD__PORT: "",
  REACT_APP_MQTT_HOST: "",
  REACT_APP_MQTT_PORT: "",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: SETTINGS,
  reducers: {
    setFlowbuildHost: (state, { payload }) => {
      setStorageItem("REACT_APP_FLOWBUILD_HOST", payload);
      state.REACT_APP_FLOWBUILD_HOST = payload;
    },
    setFlowbuildPort: (state, { payload }) => {
      setStorageItem("REACT_APP_FLOWBUILD__PORT", payload);
      state.REACT_APP_FLOWBUILD__PORT = payload;
    },
    setMqttHost: (state, { payload }) => {
      setStorageItem("REACT_APP_MQTT_HOST", payload);
      state.REACT_APP_MQTT_HOST = payload;
    },
    setMqttPort: (state, { payload }) => {
      setStorageItem("REACT_APP_MQTT_PORT", payload);
      state.REACT_APP_MQTT_PORT = payload;
    },
  },
});

export const { setFlowbuildHost, setFlowbuildPort, setMqttHost, setMqttPort } =
  settingsSlice.actions;

export default settingsSlice.reducer;

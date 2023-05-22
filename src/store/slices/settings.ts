import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  mqtt: {
    lastUpdate?: Date;
  };
}

const initialState: SettingsState = {
  mqtt: {
    lastUpdate: undefined,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateMqtt: (state) => {
      state.mqtt.lastUpdate = new Date();
    },
  },
});

export const { updateMqtt } = settingsSlice.actions;

export default settingsSlice.reducer;

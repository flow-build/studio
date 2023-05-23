import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  isWatching: boolean;
  processId?: string;
  status?: string;
  currentNode?: string;
}

const initialState: SettingsState = {
  isWatching: false,
  processId: "",
  status: "",
  currentNode: "",
};

export const processBarSlice = createSlice({
  name: "processBar",
  initialState,
  reducers: {
    setProcessBar: (state, action: PayloadAction<SettingsState>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setProcessBar } = processBarSlice.actions;

export default processBarSlice.reducer;

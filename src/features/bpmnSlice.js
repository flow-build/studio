import { createSlice } from "@reduxjs/toolkit";

export const bpmnSlice = createSlice({
  name: "bpmnSlice",
  initialState: {
    propertiesDrawer: [],
    isDrawerActive: false,
    isProcessDrawerActive: false,
    selectedProcess: "",
  },
  reducers: {
    setPropertiesDrawerItems: (state, action) => {
      state.propertiesDrawer = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.isDrawerActive = action.payload;
    },
    toggleProcessDrawer: (state, action) => {
      state.isProcessDrawerActive = action.payload;
    },
    setSelectedProcess: (state, action) => {
      state.selectedProcess = action.payload;
    },
  },
});

export const {
  setPropertiesDrawerItems,
  toggleDrawer,
  toggleProcessDrawer,
  setSelectedProcess,
} = bpmnSlice.actions;

export default bpmnSlice.reducer;

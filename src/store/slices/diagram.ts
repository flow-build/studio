import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProcess } from "models/process";

interface IInitialState {
  propertiesDialog: { isVisible: boolean; data?: any };
  confirmationDialog: { isVisible: boolean; data?: any };
  processSelected?: TProcess;
}

const initialState: IInitialState = {
  propertiesDialog: {
    isVisible: false,
    data: {},
  },

  confirmationDialog: {
    isVisible: false,
    data: {},
  },

  processSelected: undefined,
};

export const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers: {
    setProcessSelected: (
      state,
      action: PayloadAction<TProcess | undefined>
    ) => {
      state.processSelected = action.payload ?? ({} as TProcess);
    },

    setShowConfirmationDialog: (
      state,
      action: PayloadAction<{ isVisible: boolean; data?: any }>
    ) => {
      state.confirmationDialog = {
        isVisible: action.payload.isVisible,
        data: action.payload.data ?? {},
      };
    },

    setShowPropertiesDialog: (
      state,
      action: PayloadAction<{ isVisible: boolean; data?: any }>
    ) => {
      state.propertiesDialog = {
        isVisible: action.payload.isVisible,
        data: action.payload.data ?? {},
      };
    },
  },
});

export const {
  setProcessSelected,
  setShowConfirmationDialog,
  setShowPropertiesDialog,
} = diagramSlice.actions;

export default diagramSlice.reducer;

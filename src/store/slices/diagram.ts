import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProcess } from "models/process";

interface IInitialState {
  propertiesDialog: { isVisible: boolean; data?: any };
  confirmationDialog: { isVisible: boolean; data?: any };
  processInfoDialog: { isVisible: boolean; data?: any };
  showDataChannelDialog: { isVisible: boolean; data?: any };
  processSelected?: TProcess;
  element?: { category: string; id: string };
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

  processInfoDialog: {
    isVisible: false,
    data: {},
  },

  showDataChannelDialog: {
    isVisible: false,
    data: {},
  },

  processSelected: undefined,

  element: undefined,
};

export const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers: {
    setShowProcessInfoDialog: (
      state,
      action: PayloadAction<{ isVisible: boolean; data?: any }>
    ) => {
      state.processInfoDialog = {
        isVisible: action.payload.isVisible,
        data: action.payload.data ?? {},
      };
    },

    setProcessSelected: (
      state,
      action: PayloadAction<TProcess | undefined>
    ) => {
      state.processSelected = action.payload ?? ({} as TProcess);
    },

    setElement: (
      state,
      action: PayloadAction<{ category: string; id: string } | undefined>
    ) => {
      state.element = action.payload;
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

    setShowDataChannelDialog: (
      state,
      action: PayloadAction<{ isVisible: boolean; data?: any }>
    ) => {
      state.showDataChannelDialog = {
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
  setShowProcessInfoDialog,
  setShowDataChannelDialog,
  setElement,
} = diagramSlice.actions;

export default diagramSlice.reducer;

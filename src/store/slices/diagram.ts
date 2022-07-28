import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  propertiesDialog: { isVisible: boolean; data?: any };
  confirmationDialog: { isVisible: boolean; data?: any };
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
};

export const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers: {
    setShowPropertiesDialog: (
      state,
      action: PayloadAction<{ isVisible: boolean; data?: any }>
    ) => {
      state.propertiesDialog = {
        isVisible: action.payload.isVisible,
        data: action.payload.data ?? {},
      };
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
  },
});

export const { setShowPropertiesDialog, setShowConfirmationDialog } =
  diagramSlice.actions;

export default diagramSlice.reducer;

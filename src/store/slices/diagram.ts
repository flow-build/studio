import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  propertiesDialog: { isVisible: boolean; data?: any };
}

const initialState: IInitialState = {
  propertiesDialog: {
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
  },
});

export const { setShowPropertiesDialog } = diagramSlice.actions;

export default diagramSlice.reducer;

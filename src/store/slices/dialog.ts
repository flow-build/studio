import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "models/user";

interface IInitialState {
  propertiesDialog: { isVisible: boolean; data?: any };
  confirmationDialog: { isVisible: boolean; data?: any };
  diagramInfoDialog: { isVisible: boolean; data?: any };
  editDialog: { isVisible: boolean; data?: any };
  diagramSelected?: TUser;
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

  diagramInfoDialog: {
    isVisible: false,
    data: {},
  },

  editDialog: {
    isVisible: false,
    data: {},
  },

  diagramSelected: undefined,

  element: undefined,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setShowDiagramInfoDialog: (
      state,
      action: PayloadAction<{ isVisible: boolean; data?: any }>
    ) => {
      state.diagramInfoDialog = {
        isVisible: action.payload.isVisible,
        data: action.payload.data ?? {},
      };
    },

    setDiagramSelected: (state, action: PayloadAction<TUser | undefined>) => {
      state.diagramSelected = action.payload ?? ({} as TUser);
    },

    setDiagramElement: (
      state,
      action: PayloadAction<{ category: string; id: string } | undefined>
    ) => {
      state.element = action.payload;
    },

    setConfirmationDialog: (
      state,
      action: PayloadAction<{ isVisible: boolean; data?: any }>
    ) => {
      state.confirmationDialog = {
        isVisible: action.payload.isVisible,
        data: action.payload.data ?? {},
      };
    },

    setPropertiesDialog: (
      state,
      action: PayloadAction<{ isVisible: boolean; data?: any }>
    ) => {
      state.propertiesDialog = {
        isVisible: action.payload.isVisible,
        data: action.payload.data ?? {},
      };
    },

    setEditDialog: (
      state,
      action: PayloadAction<{ isVisible: boolean; data?: any }>
    ) => {
      state.editDialog = {
        isVisible: action.payload.isVisible,
        data: action.payload.data ?? {},
      };
    },
  },
});

export const {
  setShowDiagramInfoDialog,
  setConfirmationDialog,
  setPropertiesDialog,
  setEditDialog,
  setDiagramSelected,
  setDiagramElement,
} = dialogSlice.actions;

export default dialogSlice.reducer;


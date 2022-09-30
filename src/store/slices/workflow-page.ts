import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDialog {
  isVisible: boolean;
  data?: any;
}

interface WorkflowPageState {
  filter: string;
  startProcessDialog: IDialog;
}

const initialState: WorkflowPageState = {
  filter: "",

  startProcessDialog: {
    isVisible: false,
    data: {},
  },
};

export const workflowPageSlice = createSlice({
  name: "workflowPage",
  initialState,
  reducers: {
    setStartProcessDialog: (state, action: PayloadAction<IDialog>) => {
      state.startProcessDialog = {
        isVisible: action.payload.isVisible,
        data: action.payload.data ?? {},
      };
    },

    updateFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },

    resetFilter: (state) => {
      state.filter = "";
    },
  },
});

export const { resetFilter, updateFilter, setStartProcessDialog } =
  workflowPageSlice.actions;

export default workflowPageSlice.reducer;

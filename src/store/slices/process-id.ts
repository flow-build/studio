import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IInitialState = {
  processId: any;
};

const INITIAL_STATE: IInitialState = {
  processId: "",
};

export const processId = createSlice({
  name: "processId",
  initialState: INITIAL_STATE,
  reducers: {
    setHistoryProcessId: (state, action: PayloadAction<string | undefined>) => {
      state.processId = action.payload;
    },
  },
});

export const { setHistoryProcessId } = processId.actions;
export default processId.reducer;

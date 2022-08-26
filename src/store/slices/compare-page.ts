import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  oldJson?: string,
  newJson?: string,
};

const INITIAL_STATE: IInitialState = {
  oldJson: undefined,
  newJson: undefined,
};

export const compareSlice = createSlice({
  name: "compareSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setOldJson: (state, { payload }) => {
      state.oldJson = payload;
    },
    setNewJson: (state, { payload }) => {
      state.newJson = payload;
    },
    resetState: (state) => {
      state.oldJson = undefined;
      state.newJson = undefined;
    },
  },
});

export const { resetState, setNewJson, setOldJson } = compareSlice.actions;

export default compareSlice.reducer;

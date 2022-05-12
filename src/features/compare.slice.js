import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
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
      state = {
        oldJson: undefined,
        newJson: undefined,
      };
    },
  },
});

export const { resetState, setNewJson, setOldJson } = compareSlice.actions;

export default compareSlice.reducer;

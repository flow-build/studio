import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TState } from "models/state";

type TInitialState = {
  history: TState[];
};

const INITIAL_STATE: TInitialState = {
  history: [],
};

export const processHistory = createSlice({
  name: "history",
  initialState: INITIAL_STATE,
  reducers: {
    setHistory: (state, action: PayloadAction<TState[]>) => {
      state.history = action.payload;
    },
  },
});

export const { setHistory } = processHistory.actions;
export default processHistory.reducer;

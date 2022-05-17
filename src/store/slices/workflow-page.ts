import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WorkflowPageState {
  filter: string;
}

const initialState: WorkflowPageState = {
  filter: '',
}

export const workflowPageSlice = createSlice({
  name: 'workflowPage',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },

    resetFilter: (state) => {
      state.filter = ''
    }
  },
});

export const { resetFilter, updateFilter } = workflowPageSlice.actions

export default workflowPageSlice.reducer;
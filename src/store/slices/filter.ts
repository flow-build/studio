import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  value: string;
}

const initialState: FilterState = {
  value: ''
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    resetFilter: (state) => {
      state.value = ''
    }
  }
})

export const { resetFilter, updateFilter } = filterSlice.actions

export default filterSlice.reducer;
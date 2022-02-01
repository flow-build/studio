import { createSlice } from '@reduxjs/toolkit'

export const bpmnSlice = createSlice({
    name: 'bpmnSlice',
    initialState: {
        propertiesDrawer: [],
        isDrawerActive: false
    },
    reducers: {
        setPropertiesDrawerItems: (state, action) => {
            state.propertiesDrawer = action.payload
        },
        toggleDrawer: (state, action) => {
            state.isDrawerActive = action.payload
        }
    }
})

export const { setPropertiesDrawerItems, toggleDrawer } = bpmnSlice.actions

export default bpmnSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const notificationsSlice = createSlice({
    name: 'notificationsSlice',
    initialState: {
        notifications: []
    },
    reducers: {
        setNotification: (state, action) => {
            state.notifications.push({
                type: action.payload?.type,
                variant: action.payload?.variant,
                message: action.payload?.message
            })
        },
        unsetNotification: (state, action) => {
            state.notifications.splice(action.payload, 1)
        }
    }
})

export const { setNotification, unsetNotification } = notificationsSlice.actions

export default notificationsSlice.reducer
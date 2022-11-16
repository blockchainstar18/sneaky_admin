import { createSlice } from '@reduxjs/toolkit'

export const supplySlice = createSlice({
    name: 'supply',
    initialState: {
        value: 'disneyplus'
    },
    reducers: {
        setStream: (state, action) => {
            state.value = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setStream } = supplySlice.actions

export default supplySlice.reducer
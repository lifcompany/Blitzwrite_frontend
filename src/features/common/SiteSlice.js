import { createSlice } from '@reduxjs/toolkit'

export const SiteSlice = createSlice({
    name: 'site',
    initialState: {
        siteName: ''
    },
    reducers: {
        setSiteNameSlice:(state, action) => {
            state.siteName = action.payload
        }
    }
})

export const { setSiteNameSlice} = SiteSlice.actions

export default SiteSlice.reducer
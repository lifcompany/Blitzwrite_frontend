import { createSlice } from '@reduxjs/toolkit'

export const SiteSlice = createSlice({
    name: 'site',
    initialState: {
        siteName: ''
    },
    reducers: {
        setSiteName:(state, action) => {
            state.siteName = action.payload
        }
    }
})

export const { setSiteName} = SiteSlice.actions

export default SiteSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const SiteSlice = createSlice({
    name: 'site',
    initialState: {
        siteName: ''
    },
    reducers: {
        setSiteNameSlice:(state, action) => {
            state.siteName = action.payload
        },
        setSiteUrlSlice:(state, action) => {
            state.siteUrl = action.payload
        },
        setSiteAdminSlice:(state, action) => {
            state.siteadmin = action.payload
        },
        setSitePasswordSlice:(state, action) => {
            state.sitepassword = action.payload
        },
    }
})

export const { setSiteNameSlice, setSiteUrlSlice, setSiteAdminSlice, setSitePasswordSlice} = SiteSlice.actions

export default SiteSlice.reducer
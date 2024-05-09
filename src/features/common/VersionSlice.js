import { createSlice } from '@reduxjs/toolkit'

export const VersionSlice = createSlice({
    name: 'version',
    initialState: {
        versionId: '',
        versionName: ''
    },
    reducers: {
        setVersionId: (state, action) => {
            
            state.versionId = action.payload
        },
        setVersionName: (state, action) => {
            
            state.versionName = action.payload
        },
        setDisplayName: (state, action) => {
            
            state.displayName = action.payload
        },
    }
})

export const { setVersionId, setVersionName, setDisplayName} = VersionSlice.actions

export default VersionSlice.reducer
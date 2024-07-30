import { createSlice } from '@reduxjs/toolkit'

export const ArticleSlice = createSlice({
    name: 'article',
    initialState: {
        gpt_version: 'gpt-turbo-3.5',
        credit: 0
    },
    reducers: {
        setGptModel: (state, action) => {
            
            state.gpt_version = action.payload
        },
        setCredit: (state, action) => {
            
            state.credit = action.payload
        },
    }
})

export const { setVersionId, setVersionName, setDisplayName, setSiteName} = ArticleSlice.actions

export default ArticleSlice.reducer
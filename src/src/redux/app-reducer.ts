import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppStatusType} from '../common/types';

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        auth: true
    } as AppStatusType,
    reducers: {
        setAppStatusAC(state, action) {
            const esState = state

            esState.status  = action.payload.status
        },
        authAC(state, action) {
            const esState = state

            esState.auth  = action.payload.auth
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC,authAC} = slice.actions

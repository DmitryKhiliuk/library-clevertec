import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'errors',
    initialState: {
        order: '',
        changeOrder: '',
        deleteOrder: '',
        rate: '',
        changeRate: '',
        photo: '',
    },
    reducers: {
        addOrderAC(state, action) {
            const esState = state

            esState.order = action.payload
        },
        changeOrderAC(state, action) {
            const esState = state

            esState.changeOrder = action.payload
        },
        deleteOrderAC(state, action) {
            const esState = state

            esState.deleteOrder = action.payload
        },
        rateAC(state, action) {
            const esState = state

            esState.rate = action.payload
        },
        photoAC(state, action) {
            const esState = state

            esState.photo = action.payload
        },
        changeRateAC(state, action) {
            const esState = state

            esState.changeRate = action.payload
        },
    },
})

export const errorReducer = slice.reducer
export const {addOrderAC, changeOrderAC, deleteOrderAC, rateAC, photoAC, changeRateAC} = slice.actions

import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'booking',
    initialState: {
        showModal: '',
        bookId: null,
        bookStatus: '',
        dateOrder: '',
        bookingId: null
    },
    reducers: {
        showModalAC(state, action) {
            const esState = state
            esState.showModal = action.payload
        },
        addBookIdAC(state, action) {
            const esState = state

            esState.bookId = action.payload
        },
        addBookStatusAC(state, action) {
            const esState = state

            esState.bookStatus = action.payload
        },
        addDateOrderAC(state, action) {
            const esState = state

            esState.dateOrder = action.payload
        },
        addBookingIdAC(state, action) {
            const esState = state

            esState.bookingId = action.payload
        }
    },
})

export const bookingReducer = slice.reducer
export const {showModalAC, addBookIdAC, addBookStatusAC, addDateOrderAC, addBookingIdAC} = slice.actions

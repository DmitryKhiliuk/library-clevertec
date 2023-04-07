import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {booksAPI} from '../api/books-api';
import {BookDetailType, RequestBookingType, RequestCommentType} from '../common/types';

import {setAppStatusAC} from './app-reducer';
import {fetchBooks} from './books-reducer';
import {addOrderAC, changeOrderAC, changeRateAC, deleteOrderAC, rateAC} from './errors-reducer';




export const fetchBook = createAsyncThunk('book/fetchBook', async (param:{bookId:number}, {dispatch, rejectWithValue}) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await booksAPI.getBookDetail(param.bookId)
        dispatch(setAppStatusAC({status: 'succeeded'}))

        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        const error = err as AxiosError

        if (!error.response) {
            throw err
        }

        return rejectWithValue(error.response.data)
    }

})
export const bookingTC = createAsyncThunk('book/booking', async (param:RequestBookingType, {dispatch, rejectWithValue}) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    try {

        const res = await booksAPI.booking(param)

        dispatch(setAppStatusAC({status: 'succeeded'}))
        dispatch(addOrderAC('success'))
        dispatch(fetchBooks())
        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        dispatch(addOrderAC('failed'))
        const error = err as AxiosError

        if (!error.response) {
            throw err
        }

        return rejectWithValue(error.response.data)
    }

})
export const reBookingTC = createAsyncThunk('book/reBooking', async (param: {data: RequestBookingType, bookingId: number | null }, {dispatch, rejectWithValue}) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await booksAPI.reBooking(param.data, param.bookingId!)

        dispatch(setAppStatusAC({status: 'succeeded'}))
        dispatch(changeOrderAC('success'))

        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        dispatch(changeOrderAC('failed'))
        const error = err as AxiosError

        if (!error.response) {
            throw err
        }

        return rejectWithValue(error.response.data)
    }

})

export const deleteBookingTC = createAsyncThunk('book/deleteBooking', async (param: {bookingId: number | null }, {dispatch, rejectWithValue}) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await booksAPI.deleteBooking(param.bookingId!)

        dispatch(setAppStatusAC({status: 'succeeded'}))
        dispatch(deleteOrderAC('success'))

        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        dispatch(deleteOrderAC('failed'))
        const error = err as AxiosError

        if (!error.response) {
            throw err
        }

        return rejectWithValue(error.response.data)
    }

})
export const commentTC = createAsyncThunk('book/comment', async (param:RequestCommentType, {dispatch, rejectWithValue}) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await booksAPI.comment(param)
        const bookId = param.data.book
        dispatch(fetchBook({bookId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        dispatch(rateAC('success'))


        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        dispatch(rateAC('failed'))
        const error = err as AxiosError

        if (!error.response) {
            throw err
        }

        return rejectWithValue(error.response.data)
    }

})
export const changeCommentTC = createAsyncThunk('book/changeComment', async (param: { data: any, commentId: number }, {dispatch, rejectWithValue}) => {

    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await booksAPI.changeComment(param.data, param.commentId)

        dispatch(setAppStatusAC({status: 'succeeded'}))
        dispatch(changeRateAC('success'))

        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        dispatch(changeRateAC('failed'))
        const error = err as AxiosError

        if (!error.response) {
            throw err
        }

        return rejectWithValue(error.response.data)
    }

})

export const slice = createSlice({
    name: 'book',
    initialState: {
        content: {} as BookDetailType,
        error: '' as string
    } ,
    reducers: {
        resetBookAC(state, action) {
            const esState = state

            esState.content = action.payload
        },
        addLeftBook (state,action) {
            const esState = state

            esState.content = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBook.fulfilled, (state, action) => {
                const esState = state

                esState.content  = action.payload
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                const esState = state

                esState.error = action.error.message!
            })
            .addCase(bookingTC.fulfilled, (state, action) => {
                const esState = state

                esState.content.booking  = action.payload
            })
            .addCase(bookingTC.rejected, (state, action) => {
                const esState = state

                esState.error = action.error.message!
            })


    }

})

export const bookReducer = slice.reducer
export const {resetBookAC, addLeftBook} = slice.actions


import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {booksAPI} from '../api/books-api';
import {BooksType} from '../common/types';

import {setAppStatusAC} from './app-reducer';
import {addLeftBook} from "./book-reducer";

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (param, {dispatch, rejectWithValue}) => {
    console.log('books')
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await booksAPI.getBooks()

        dispatch(setAppStatusAC({status: 'succeeded'}))

        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        const error = err as AxiosError

        if(!error.response){
            throw err
        }

        return rejectWithValue(error.response.data)
    }
})

export const slice = createSlice({
    name: 'books',
    initialState: {
        content: [] as BooksType,
        error: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchBooks.fulfilled, (state, action) => {
                const esState = state

                esState.content  = action.payload
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                const esState = state

                esState.error = action.error.message!
            })

    }
})

export const booksReducer = slice.reducer

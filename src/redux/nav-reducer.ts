import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {booksAPI} from '../api/books-api';
import {CategoriesType} from '../common/types';

import {setAppStatusAC} from './app-reducer';


export const fetchCategories = createAsyncThunk<CategoriesType>('nav/fetchCategories', async(param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))

    try {
        const res = await booksAPI.getCategories()

        dispatch(setAppStatusAC({status: 'succeeded'}))

        return res.data

    } catch(err) {
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
    initialState: [] as CategoriesType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => action.payload

    )
    }
})

export const navReducer = slice.reducer

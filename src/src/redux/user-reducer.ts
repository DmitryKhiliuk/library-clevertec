import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {userAPI} from '../api/user-api';
import {BookDetailType, CommentType, RegistrationDataType, UserType} from '../common/types';

import {setAppStatusAC} from './app-reducer';
import {changeOrderAC, photoAC} from "./errors-reducer";
import {authAPI} from "../api/auth-api";
import {setErrorAC} from "./auth-reducer";
import {fetchBook, resetBookAC} from "./book-reducer";
import {booksAPI} from "../api/books-api";




export const fetchUser = createAsyncThunk('user/fetchUser', async (param,{dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        console.log('fetch user')
        const res = await userAPI.getUser()

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
export const addAvatar = createAsyncThunk('user/addAvatar', async (param: { formData:any },{dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))

    try {

        const res = await userAPI.setPicture(param.formData)
        const userId = localStorage.getItem('id')
        const result = await userAPI.changePicture({'avatar': res.data[0].id, userId})

        dispatch(setAppStatusAC({status: 'succeeded'}))
        dispatch(photoAC('success'))

        return result.data.avatar
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        dispatch(photoAC('failed'))
        const error = err as AxiosError

        if (!error.response) {
            throw err
        }

        return rejectWithValue(error.response.data)
    }
})

export const ChangeUserDataTC = createAsyncThunk('user/changeUserData', async (data: RegistrationDataType, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const userId = localStorage.getItem('id')
        const res = await userAPI.changeUserData({data, userId})

        dispatch(setAppStatusAC({status: 'succeeded'}))
        dispatch(changeOrderAC('success'))

        return res.data
    } catch (err) {
        dispatch(setAppStatusAC({status: 'failed'}))
        dispatch(changeOrderAC('failed'))
        const error = err as AxiosError

        if(!error.response){
            throw err
        }
        dispatch(setErrorAC(error.response.status))

        return rejectWithValue(error.response.data)
    }
})

 export const fetchBooksForSlider = createAsyncThunk('user/fetchBooksForSlider', async (bookId:number, {dispatch, rejectWithValue}) => {
    try {
        dispatch(resetBookAC([]))
        const res = await booksAPI.getBookDetail(bookId)

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

export const slice = createSlice({
    name: 'user',
    initialState: {
        user: {} as UserType,
        books: [] as BookDetailType[],
        userComment: {} as CommentType | null,
        error: ''
    },
    reducers: {
        resetBooks(state, action) {
            const esState = state

            esState.books = action.payload
        },
        currentComment(state, action) {
            const esState = state

            esState.userComment = action.payload
        },
    },
    extraReducers: builder =>  {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                const esState = state

                esState.user  = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                const esState = state

                esState.error  = action.error.message!
            })
            .addCase(addAvatar.fulfilled, (state, action) => {
                const esState = state

                esState.user.avatar  = action.payload
            })
            .addCase(addAvatar.rejected, (state, action) => {
                const esState = state

                esState.error  = action.error.message!
            })
             .addCase(fetchBooksForSlider.fulfilled, (state, action) => {
                const esState = state

                esState.books.push(action.payload)
            })
            .addCase(fetchBooksForSlider.rejected, (state, action) => {
                const esState = state

                esState.error  = action.error.message!
            })
    }
})

export const userReducer = slice.reducer
export const {currentComment} = slice.actions

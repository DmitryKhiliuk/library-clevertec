import axios, {AxiosError} from 'axios';
import {HOST} from "../constants/routes";
import {RegistrationDataType} from "../types";



export const instance = axios.create({
    baseURL: HOST,
})

instance.interceptors.request.use(
    request => {

        request.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
        request.headers['Content-Type'] = 'multipart/form-data'

        return request
    },
    err => {

        const error = err as AxiosError

        if(!error.response){
            throw err
        }

        return error.response.data
    }
);

export const userAPI = {
    getUser(){
        return instance.get('/api/users/me')
    },
    setPicture(formData:any){
        return instance.post('https://strapi.cleverland.by/api/upload', formData)
    },
    changePicture({avatar: id, userId}:ChangePictureType){
        return instance.put(`/api/users/${userId}`, {avatar: id})
    },
    changeUserData({data, userId}:ChangeUserDataType){
        return instance.put(`/api/users/${userId}`, data)
    },
}


type ChangePictureType = {
    avatar: string,
    userId: string | null
}

type ChangeUserDataType = {
    data: RegistrationDataType,
    userId: string | null
}

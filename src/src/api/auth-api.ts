import axios from 'axios';

import {HOST} from '../common/routes';
import {AuthDataType, RecoveryDataType, RegistrationDataType, ResetDataType} from '../common/types';

const instance = axios.create({
    baseURL: HOST,
})


export const authAPI = {
    auth(data: AuthDataType){
        return instance.post('/api/auth/local', data)
    },
    register(dataReg: RegistrationDataType) {
        return instance.post('/api/auth/local/register', dataReg)
    },
    forgot(mail: ResetDataType) {
        return instance.post('/api/auth/forgot-password', mail)
    },
    reset(dataPass:RecoveryDataType) {
        return instance.post('/api/auth/reset-password', dataPass)
    }
}

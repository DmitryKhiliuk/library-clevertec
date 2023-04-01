import {useEffect, useState} from 'react';
import {FieldErrors, UseFormClearErrors, UseFormRegister} from 'react-hook-form';

import {RegistrationDataType} from '../../../common/types';
import {disableButton} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';
import {Input} from '../../input';

type EmailType = {
    register:  UseFormRegister<any>
    clearErrors:  UseFormClearErrors<any>
    errors: FieldErrors<RegistrationDataType>
    forProfile?: boolean
    defaultValue?: string

}

export const Email = ({register, clearErrors, errors, forProfile, defaultValue}:EmailType) => {

    const regMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    const regExpForMail = {value: regMail, message: 'Введите корректный e-mail'}
    let disable = false
    const dispatch = useAppDispatch()


    const getValidMail = (value:string) => {
        clearErrors()
    }

    if (errors.email ) {
        disable = true
    }

    useEffect(() => {
        dispatch(disableButton(disable))
    }, [dispatch, disable])

    return (
        <div>
            <Input register={register}
                   name='email'
                   label='E-mail'
                   type='text'
                   errorMessage={errors.email?.message}
                   pattern={regExpForMail}
                   validation={(value) => getValidMail(value)}
                   forProfile={forProfile}
                   defaultValue={defaultValue}
            />
        </div>
    );
};


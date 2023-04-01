import {useEffect, useState} from 'react';
import {Control, FieldErrors, UseFormClearErrors, UseFormRegister} from 'react-hook-form';
import cn from 'classnames';

import {RegistrationDataType} from '../../../common/types';
import {disableButton} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';
import {Input} from '../../input';

import styles from './login.module.scss';

type PhoneType = {
    register:  UseFormRegister<any>
    clearErrors:  UseFormClearErrors<any>
    errors: FieldErrors<RegistrationDataType>
    control: Control<RegistrationDataType>
    forProfile?: boolean
    defaultValue?: string

}

export const Phone = ({register, clearErrors, errors, forProfile, control, defaultValue}:PhoneType) => {

    const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12,14}(\s*)?$/
    const regExpForPhone = {value: regPhone, message: 'error phone'}
    let disable = false

    const dispatch = useAppDispatch()

    const [phone, setPhone] = useState(true)

    const getValidPhone = (value:string) => {
        clearErrors()
        setPhone(regPhone.test(value))
    }

    if (errors.phone ) {
        disable = true
    }

    useEffect(() => {
        dispatch(disableButton(disable))
    }, [dispatch, disable])

    return (
        <div className={styles.main}>
            <Input register={register}
                   name='phone'
                   label='Телефон'
                   control={control}
                   type='text'
                   errorMessage={errors.phone?.message}
                   validation={(value) => getValidPhone(value)}
                   pattern={regExpForPhone}
                   forProfile={forProfile}
                   defaultValue={defaultValue}/>
            {errors.phone?.message !== 'Поле не может быть пустым' &&
                <div data-test-id='hint' className={cn(styles.hintPhone, !phone || errors.phone  && styles.hintPhoneError, !forProfile&&styles.profile)}>В формате +375 (xx) xxx-xx-xx</div>}
        </div>
    );
};


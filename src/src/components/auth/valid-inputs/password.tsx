import {useEffect, useState} from 'react';
import {FieldErrors, UseFormClearErrors, UseFormRegister} from 'react-hook-form';
import cn from 'classnames';

import {RegistrationDataType} from '../../../common/types';
import {disableButton} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';
import {Input} from '../../input';

import styles from './login.module.scss';

type PasswordType = {
    register:  UseFormRegister<any>
    clearErrors:  UseFormClearErrors<any>
    errors: FieldErrors<RegistrationDataType>
    forProfile?: boolean
    defaultValue?: string
    prof?: boolean


}

export const Password = ({register, clearErrors, errors, forProfile, defaultValue, prof}:PasswordType) => {

    const regExpForPassword = {value: /^[0-9A-ZА-Я]{0,8}/, message: 'error password'}
    const minLength = {value: 8, message: 'error length'}
    let disable = false

    const dispatch = useAppDispatch()

    const [length, setLength] = useState(true)
    const [upperCase, setUpperCase] = useState(true)
    const [numbPass, setNumbPass] = useState(true)

    let pass = false

    if (length&&upperCase&&numbPass) {
        pass = true
    }
    if (!pass) {
        disable = true
    }


    const getValidPassword = (value:string) => {

        if (!prof) {
            clearErrors()
        }
        setLength( /.{8,}/.test(value))
        setUpperCase( /[A-ZА-Я]/.test(value))
        setNumbPass(/[0-9]/.test(value))
    }

    useEffect(() => {
        dispatch(disableButton(disable))
    }, [dispatch, disable])


    return (
        <div className={styles.main}>
            <Input register={register}
                   name='password'
                   label='Пароль'
                   type='password'
                   validation={(value) => getValidPassword(value)}
                   errorMessage={errors.password?.message}
                   pattern={regExpForPassword}
                   successPass={pass}
                   minLength={minLength}
                   forProfile={forProfile}
                   defaultValue={defaultValue}/>
            {errors.password?.message !== 'Поле не может быть пустым'  &&
                <div data-test-id='hint' className={cn(!length&&!upperCase&&!numbPass || errors.password ? styles.hintPasswordError : styles.hintPassword, !forProfile&&styles.profile, prof&&!pass&&styles.rd)}>
                    Пароль <span className={cn(!length&&styles.lengthPasswordHint)}>не менее 8 символов,
                                    </span> с <span className={cn(!upperCase&&styles.upperCasePasswordHint)}>заглавной буквой</span> и
                    <span className={cn(!numbPass&&styles.numberPasswordHint)}> цифрой</span>
                </div>}
        </div>
    );
};


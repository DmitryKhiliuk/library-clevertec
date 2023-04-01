import {useEffect, useState} from 'react';
import {UseFormClearErrors, UseFormRegister} from 'react-hook-form';
import cn from 'classnames';
import {disableButton} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';
import {Input} from '../../input';

import styles from './login.module.scss';

type LoginType = {
    register:  UseFormRegister<any>
    clearErrors:  UseFormClearErrors<any>
    errors: any
    forProfile?: boolean
    label?:string
    name?:string
    defaultValue?: string
    prof?: boolean

}

export const Login = ({register, clearErrors, errors, forProfile, label, defaultValue, name, prof}:LoginType) => {
    const regExpForUserName = {value: /^[A-Za-z0-9]+$/, message: 'error userName'}
    let disable = false
    const dispatch = useAppDispatch()

    const [userName, setUserName] = useState(true)
    const [latin, setLatin] = useState(true)
    const [numb, setNumb] = useState(true)


    let user = false

    if (userName&&latin&&numb) {
        user = true
    }
    const getValidUserName = (value:string) => {
        clearErrors()
        setUserName(/^[A-Za-z0-9]+$/.test(value))
        setLatin( /[A-Za-z]/.test(value))
        setNumb(/[0-9]/.test(value))
    }

    if (!user || errors.username || errors.password) {
        disable = true
    }
    useEffect(() => {
        dispatch(disableButton(disable))
    }, [dispatch, disable])


    return (
        <div className={styles.main}>
            <Input register={register}
                   name={name ? name : 'username'}
                   label={label ? label : 'Придумайте логин для входа'}
                   type='text'
                   validation={(value) => getValidUserName(value)}
                   errorMessage={ errors.username?.message || errors.login?.message}
                   pattern={regExpForUserName}
                   forProfile={forProfile}
                   defaultValue={defaultValue}/>
            {errors.username?.message !== 'Поле не может быть пустым'  && errors.login?.message !== 'Поле не может быть пустым' &&
                <div data-test-id='hint' className={cn(errors.username || errors.login?.message ? styles.hintUserNameError : styles.hintUserName, !forProfile&&styles.profile, prof&&user&&styles.rd)}>
                    <span>Используйте для логина </span>
                    <span className={cn(latin ? styles.hintUserName : styles.hintUserNameError)}>латинский алфавит </span>
                    <span>и</span>
                    <span className={cn(numb  ? styles.hintUserName : styles.hintUserNameError)}> цифры</span>
                </div>}
        </div>
    );
};


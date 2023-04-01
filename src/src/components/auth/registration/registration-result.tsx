import {Dispatch, SetStateAction} from 'react';
import {useNavigate} from 'react-router-dom';

import {AUTH} from '../../../common/routes';
import {selectErrorStatus} from '../../../common/selectors';
import {setErrorAC} from '../../../redux/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {Button} from '../../buttons';

import styles from './registrationResult.module.scss';


type RegistrationResultType = {
    setStep: Dispatch<SetStateAction<number>>

}


export const RegistrationResult = ({setStep}: RegistrationResultType) => {

    const errorStatus = useAppSelector(selectErrorStatus)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (errorStatus) {
            dispatch(setErrorAC(''))
            setStep(1)
        } else {
            navigate(AUTH)
        }
    }

    return (

        <div className={styles.content} data-test-id='status-block'>
            <h4 className={styles.title}>{errorStatus ? 'Данные не сохранились' : 'Регистрация успешна'}</h4>
            <div className={styles.text}>{errorStatus ? (errorStatus === 400 ?
                    'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.' :
                    'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз') :
                'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'}</div>
            <Button size='large'
                    name={errorStatus ? (errorStatus === 400 ? 'Назад к регистрации' : 'Повторить') : 'Вход'}
                    callBack={onClickHandler}/>
        </div>


    );
};


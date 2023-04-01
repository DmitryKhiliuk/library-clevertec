import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate, useSearchParams} from 'react-router-dom';

import dartDown from '../../../assets/icons/modal/forgot.svg'
import dartUp from '../../../assets/icons/modal/Icon_Chevron.svg'
import {AUTH, MAIN, REG} from '../../../common/routes';
import {selectErrorStatus, selectSuccessStatus} from '../../../common/selectors';
import {ResetDataType} from '../../../common/types';
import {ForgotPasswordTC} from '../../../redux/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {Button} from '../../buttons';
import {Input} from '../../input';
import {Modal} from '../../modal';

import {ForgotResult} from './forgot-result';
import {Reset} from './reset';

import styles from './forgot.module.scss'
import {Email} from "../valid-inputs";


export const Forgot = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector(selectErrorStatus)
    const mailStatus = useAppSelector(selectSuccessStatus)
    const jwt = localStorage.getItem('jwt')
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();

    const code = searchParams.get('code')

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        clearErrors
    } = useForm<ResetDataType>({
        mode: 'all',
        reValidateMode: 'onBlur'
    });
    // const [stat, setStat] = useState(false)

    const onSubmit = (mail: ResetDataType) => {
        dispatch(ForgotPasswordTC(mail))
        reset()
    }

   /* const regMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    let regExpForMail = {value: regMail, message: 'Введите корректный e-mail'}

    if (error) {
        regExpForMail = {value: regMail, message: error}
    }

     const [mail, setMail] = useState(true)

    const getValidMail = (value: string) => {
        setMail(regMail.test(value))
    } */


     useEffect(() => {
        if (jwt) {
           navigate(MAIN)
        }
    }, [jwt, navigate])

    const onClickButtonHandler = () => {
    }

    return (
        <div>
            <Modal content="auth">

                {mailStatus ? <ForgotResult/> : (code ?
                    <Reset code={code}/> :
                    <div className={styles.main}>
                        <div className={styles.content}>
                            <NavLink className={styles.link} to={AUTH}>
                                <span className={styles.img}><img src={dartDown} alt="dart"/></span>
                                <span className={styles.text}>вход в личный кабинет </span>
                            </NavLink>
                            <h4 className={styles.title}>Восстановление пароля</h4>
                            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
                                <Email  register={register}
                                        clearErrors={clearErrors}
                                        errors={errors}
                                        forProfile={true}/>
                                {/* <Input register={register}
                                       name='email' label='E-mail'
                                       type='text'
                                       errorMessage={errors.email?.message}
                                       pattern={regExpForMail}
                                       validation={(value) => getValidMail(value)}
                                       required='Введите корректный e-mail'/> */}
                                {error && <div data-test-id='hint'  className={styles.error}>error</div>}
                                <div className={styles.description}>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</div>
                                <Button size='large' type='submit' name='Восстановить'
                                        callBack={onClickButtonHandler}/>
                            </form>
                            <div className={styles.space}/>
                            <div>
                                <span className={styles.registerText}>Нет учетной записи?</span>
                                <span className={styles.register}>
                                     <NavLink className={styles.link} to={REG}>
                                        <span className={styles.text}>Регистрация </span>
                                        <span className={styles.img}><img src={dartUp} alt="dart"/></span>
                                    </NavLink>
                                </span>
                            </div>
                        </div>
                    </div>)
                }
            </Modal>
        </div>
    );
};


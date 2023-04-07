import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';

import dart from '../../../assets/icons/modal/Icon_Chevron.svg';
import {AUTH, MAIN} from '../../../common/routes';
import {selectButtonStatus} from '../../../common/selectors';
import {RegistrationDataType} from '../../../common/types';
import {
    addFromStepOne,
    addFromStepThree,
    addFromStepTwo,
    RegistrationTC
} from '../../../redux/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {Button} from '../../buttons';
import {Modal} from '../../modal';
import {Email, Login, Password, Phone, Simple} from '../valid-inputs';

import {RegistrationResult} from './registration-result';

import styles from './registration.module.scss';


export const Registration = () => {


    const dispatch = useAppDispatch()
    const dis = useAppSelector(selectButtonStatus)

    const [step, setStep] = useState<number>(1)


    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
        clearErrors,
        reset
    } = useForm<RegistrationDataType>({
        mode: 'all',
        reValidateMode: 'onBlur'
    });

    const onSubmit = (data:RegistrationDataType) => {
        if (step === 1) {
            dispatch(addFromStepOne(data))
            reset()
        }
        if (step === 2) {
            dispatch(addFromStepTwo(data))
            reset()
        }
        if (step === 3) {
            dispatch(addFromStepThree(data))
            dispatch(RegistrationTC(data))
            reset()
        }

        if (step < 4) {
            setStep(step+1)
        }

    }

    let disable = false


    if (dis) {
        disable = true
    }

    const getValidFirstName = (value:string) => {
        clearErrors('firstName')
    }
    const getValidLastName = (value:string) => {
        clearErrors('lastName')
    }


    const onClickButtonHandler = () => {}
    const jwt = localStorage.getItem('jwt')
    const navigate = useNavigate()

    useEffect(() => {
        if (jwt) {
            navigate(MAIN)
        }
    }, [jwt, navigate])



    return (
        <div>
            <Modal content="auth">
                    <div className={styles.main}>
                        {step===4 ?
                            <RegistrationResult setStep={setStep} />:
                            <div className={styles.content}>
                            <h3 className={styles.title}>Регистрация</h3>
                            <div className={styles.step}>
                                {step===1 && '1 шаг из 3'}
                                {step===2 && '2 шаг из 3'}
                                {step===3 && '3 шаг из 3'}
                            </div>
                            {step===1&&
                                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                                    <Login register={register}
                                           clearErrors={clearErrors}
                                           errors={errors}
                                           forProfile={true}/>

                                    <Password  register={register}
                                               clearErrors={clearErrors}
                                               errors={errors}
                                               forProfile={true}/>

                                    <div className={styles.space}/>
                                    <Button size='large' type='submit' name='Следующий шаг' callBack={onClickButtonHandler} disableButton={disable}/>
                                </form>
                            }
                            {step===2&&
                                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                                    <Simple  register={register}
                                             clearErrors={clearErrors}
                                             errors={errors.firstName?.message}
                                             name='firstName'
                                             label='Имя'
                                             type='text'
                                             forProfile={true}
                                             callBack={(value) => getValidFirstName(value)}/>
                                    <Simple  register={register}
                                             clearErrors={clearErrors}
                                             errors={errors.lastName?.message}
                                             name='lastName'
                                             label='Фамилия'
                                             type='text'
                                             forProfile={true}
                                             callBack={(value) => getValidLastName(value)}/>

                                    <div className={styles.space}/>
                                    <Button size='large' type='submit' name='Последний шаг' callBack={onClickButtonHandler} disableButton={disable}/>
                                </form>
                            }
                            {step===3&&
                                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
                                    <Phone  register={register}
                                            clearErrors={clearErrors}
                                            errors={errors}
                                            control={control}
                                            forProfile={true}/>

                                    <Email  register={register}
                                            clearErrors={clearErrors}
                                            errors={errors}
                                            forProfile={true}/>
                                    <div className={styles.space}/>
                                    <Button size='large' type='submit' name='зарегистрироваться' callBack={onClickButtonHandler} disableButton={disable}/>
                                </form>
                            }
                            <div>
                                <span className={styles.registerText}>Есть учетная запись?</span>
                                <span className={styles.register}>
                            <NavLink className={styles.link} to={AUTH}>
                                <span className={styles.text}>Войти </span>
                                <span className={styles.img}><img src={dart} alt="dart"/></span>
                            </NavLink>
                        </span>
                            </div>
                        </div>}
                    </div>
            </Modal>
        </div>
    )
};



import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {selectUser} from '../../common/selectors';
import {RegistrationDataType} from '../../common/types';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ChangeUserDataTC} from '../../redux/user-reducer';
import {Email, Login, Password, Phone, Simple} from '../auth/valid-inputs';
import {ButtonEditUser, ButtonSaveUser} from '../buttons';

import styles from './user-data.module.scss';

export const UserData = () => {

    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()

    const [input, setInput] = useState(false)
    let disable = false

    if (!input) {
        disable = true
    }
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


    const onSubmit = (data: any) => {
        const data1 = {...data}

        data1.username = data.login
        delete data1.login
        reset()
        dispatch(ChangeUserDataTC(data1))
    }
    const onClickEditButtonHandler = () => {
        setInput(!input)
        // clearErrors()
    }

    const onClickButtonHandler = () => {}
    const getValidName = (value:string) => {}

    return (
        <div className={styles.main} data-test-id='profile-form'>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form} data-test-id='profile-form' >
                <div className={styles.content}>
                     <div className={styles.dataBlock}>
                         <Login register={register}
                                clearErrors={clearErrors}
                                errors={errors}
                                name='login'
                                label='Логин'
                                defaultValue={user.username}
                                forProfile={input}
                                prof={true}/>
                         <Simple  register={register}
                                  clearErrors={clearErrors}
                                  errors={errors.firstName?.message}
                                  name='firstName'
                                  label='Имя'
                                  type='text'
                                  defaultValue={user.firstName}
                                  forProfile={input}
                                  prof={true}
                                  callBack={(value) => getValidName(value)}/>
                         <Phone  register={register}
                                 clearErrors={clearErrors}
                                 errors={errors}
                                 control={control}
                                 defaultValue={user.phone}
                                 forProfile={input}/>
                    </div>
                    <div className={styles.space}/>
                    <div className={styles.dataBlock}>
                        <Password  register={register}
                                   clearErrors={clearErrors}
                                   errors={errors}
                                   defaultValue='*********'
                                   forProfile={input}
                                   prof={true}/>
                        <Simple  register={register}
                                 clearErrors={clearErrors}
                                 errors={errors.lastName?.message}
                                 name='lastName'
                                 label='Фамилия'
                                 type='text'
                                 defaultValue={user.lastName}
                                 forProfile={input}
                                 prof={true}
                                 callBack={(value) => getValidName(value)}/>
                        <Email  register={register}
                                clearErrors={clearErrors}
                                errors={errors}
                                defaultValue={user.email}
                                forProfile={input}/>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button}>
                        <ButtonEditUser  data-test-id='edit-button' size='large' type='button' name='Редактировать' callBack={onClickEditButtonHandler} bookingCancel={true}/>
                    </div>
                    <div className={styles.button}>
                        <ButtonSaveUser   size='large' type='submit' name='сохранить изменения' callBack={onClickButtonHandler} disableButton={disable}/>
                    </div>
                </div>
            </form>
        </div>
    );
};


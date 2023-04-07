import {ChangeEvent, useState} from 'react';
import {Control, Controller, UseFormRegister} from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import cn from 'classnames';

import eyeClose from '../../assets/icons/modal/Eye-close.svg'
import eyeOpen from '../../assets/icons/modal/Eye-open.svg'
import success from '../../assets/icons/modal/Icon_Other.svg'
import {selectErrorStatus} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';

import styles from './input.module.scss'


type InputType = {
    register:  UseFormRegister<any>
    errorMessage?:  string
    name: string
    label: string
    type: string
    required?: string
    validation?: (value:string) => void
    errorFlag?: string
    pattern?: {value: RegExp, message: string}
    minLength?: {value: number, message: string}
    control?: Control<any,any>
    successPass?:  boolean
    validate?: (value: string) => true | string
    forProfile?: boolean
    defaultValue?: string
}

export const Input = ({register,
                          name,
                          label,
                          type,
                          errorMessage,
                          validate,
                          validation,
                          errorFlag,
                          pattern,
                          minLength,
                          control,
                          forProfile,
                          defaultValue,
                          successPass}:InputType) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')


    const errorStatus = useAppSelector(selectErrorStatus)

    const onClickHandler = () => {
        setOpen(!open)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {

        setValue(e.currentTarget.value)
        validation!(e.currentTarget.value)
    }
    const [blur, setBlur] = useState(false)
    const onBlurHandler = () => {
       setBlur(true)
    }




    return (
        <div>
            <div className={cn(styles.main, errorMessage && styles.mainError || errorStatus && styles.mainError || errorFlag && styles.mainError,  !forProfile&&styles.profile  )}>
                <div className={styles.inputBox}>
                    {name==='phone'?
                        <Controller  control={control} name='phone' rules={{required: {value: true, message: 'Поле не может быть пустым'}, minLength, pattern}} render={({field:{onChange, onBlur}}) => (
                            <MaskedInput data-test-id='register-form' className={styles.input}
                                         mask={['+','3','7','5', ' ', '(',/\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                         type='tel'
                                         name='phone'
                                         placeholder=' '
                                         placeholderChar="x"
                                         onChange={onChange}
                                         onBlur={onBlur}
                                         disabled={!forProfile}
                                         defaultValue={defaultValue}

                            />
                        )}/>
                        :
                        <input  className={styles.input}
                            {...register(name,
                                {
                                    validate,
                                    required: {value: true, message: 'Поле не может быть пустым'},
                                    minLength,
                                    pattern,
                                    onBlur: onBlurHandler,
                                })}
                            type={open ? 'text' : type} placeholder=' '
                                disabled={!forProfile}
                                defaultValue={defaultValue}
                            onChange={onChangeHandler}/>}
                    <label className={styles.label} htmlFor={name}>{label}</label>
                </div>
                {value&&successPass&&<img data-test-id='checkmark' className={styles.img} src={success} alt="success"/>}
                {type === 'password' && value && <button onClick={onClickHandler} type='button'>{open ? <img data-test-id='eye-opened' className={styles.img} src={eyeOpen} alt="eye"/> : <img data-test-id='eye-closed' className={styles.img} src={eyeClose} alt="eye"/>}</button>}
            </div>
            {/* {errorMessage==='Поле не может быть пустым'&&<div className={styles.errorMessage} data-test-id='hint'>Поле не может быть пустым</div>} */}
            {name === 'email' || name === 'passwordConfirmation' ? <div className={styles.errorMessage} data-test-id='hint'>{errorMessage}</div>:
            !value && <div className={styles.errorMessage} data-test-id='hint'>{errorMessage}</div>}
        </div>
    );
};


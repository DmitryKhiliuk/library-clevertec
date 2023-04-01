import {useEffect} from 'react';
import {UseFormClearErrors, UseFormRegister} from 'react-hook-form';
import {disableButton} from '../../../redux/auth-reducer';
import {useAppDispatch} from '../../../redux/store';
import {Input} from '../../input';

type SimpleType = {
    register:  UseFormRegister<any>
    clearErrors:  UseFormClearErrors<any>
    errors: string | undefined
    forProfile?: boolean
    name: string
    label: string
    type: string
    defaultValue?: string
    prof?: boolean
    callBack?: (value: string) => void

}

export const Simple = ({register,
                           clearErrors,
                           errors,
                           name,
                           label,
                           type,
                           forProfile, defaultValue, prof, callBack}:SimpleType) => {

    let disable = false

    if (errors?.length) {
        disable = true
    }

    const dispatch = useAppDispatch()

    const getValidName = (value:string) => {
        callBack!(value)
    }

    useEffect(() => {
        dispatch(disableButton(disable))
    }, [dispatch, disable])

    return (
        <div>
            <Input register={register}
                   name={name}
                   label={label}
                   type={type}
                   validation={(value) => getValidName(value)}
                   errorMessage={prof ? '' : errors}
                   forProfile={forProfile}
                   defaultValue={defaultValue}/>
        </div>
    );
};


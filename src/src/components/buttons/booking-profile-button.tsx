import React from 'react';
import cn from 'classnames';
import {BookingType, DeliveryType} from '../../common/types';

import styles from './button.module.scss'

type ButtonType = {

    size: string
    name?: string
    date?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    callBack: () => void
    disableButton?: boolean
    bookingCancel?: boolean

}

export const BookingProfileButton = ({ size, name, date, type, callBack, disableButton, bookingCancel}:ButtonType) => {


    const id = localStorage.getItem('id')




    let disable = false
    let buttonName

    if (disableButton) {
        disable = true
    }


    let result: string

    function getStatus() {

            result = `${styles.primary}`
            buttonName = 'забронировать'


            return result

    }

    const getSize = () => {
        let result

        if(size==='small'){
            result = `${styles.smallSize}`
        } else if (size ==='large'){
            result = `${styles.largeSize}`
        }

        return result
    }


    const bookStatus = getStatus()

    const buttonSize = getSize()


    const onClickHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        callBack()

    }


    return (


            <button data-test-id='cancel-booking-button'
                    className={cn(`${bookStatus} ${buttonSize}`, bookingCancel && styles.secondary)}
                    onClick={onClickHandler} type={type === 'submit' ? 'submit' : 'button'}
                    disabled={disable}>
                {name ? name : buttonName}
            </button>



    )
}


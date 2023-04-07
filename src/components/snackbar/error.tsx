import cn from 'classnames';

import close from '../../assets/icons/snackbar-icon/Icon_Action.svg'
import success from '../../assets/icons/snackbar-icon/SuccessCircle.svg'
import warning from '../../assets/icons/snackbar-icon/WarningCircle.svg'
import {
    selectBookId,
    selectChangeOrder,
    selectDeleteOrder,
    selectOrder, selectPhoto, selectRate,
    selectStatus
} from '../../common/selectors';
import {setAppStatusAC} from '../../redux/app-reducer';
import {fetchBooks} from '../../redux/books-reducer';
import {
    addOrderAC,
    changeOrderAC,
    deleteOrderAC,
    photoAC,
    rateAC
} from '../../redux/errors-reducer';
import {fetchCategories} from '../../redux/nav-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import styles from './error.module.scss'
import {fetchUser} from "../../redux/user-reducer";
import {fetchBook} from "../../redux/book-reducer";

type ErrorType = {
    styleWind: string
    text: string
}

export const Error = ({styleWind, text}:ErrorType) => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(selectStatus)
    const order = useAppSelector(selectOrder)
    const changeOrder = useAppSelector(selectChangeOrder)
    const deleteOrder = useAppSelector(selectDeleteOrder)
    const photo = useAppSelector(selectPhoto)
    const rate = useAppSelector(selectRate)
    const bookId = useAppSelector(selectBookId)

    const onClickHandlerForBooking = () => {
        dispatch(setAppStatusAC({status:'idle'}))
        dispatch(addOrderAC(''))
        dispatch(changeOrderAC(''))
        dispatch(deleteOrderAC(''))
        dispatch(rateAC(''))
        dispatch(photoAC(''))
        dispatch(fetchBooks())
        dispatch(fetchCategories())
        dispatch(fetchUser())
        if (bookId ) {
            dispatch(fetchBook({bookId}))
        }
    }

    const onClickHandlerForRate = () => {
        dispatch(setAppStatusAC({status:'idle'}))
        dispatch(rateAC(''))
    }

    if (status==='failed'||order||changeOrder||deleteOrder||photo){
        setTimeout(() => {
            onClickHandlerForBooking()
        }, 4000)
    }
    if (status==='failed'|| rate){
        setTimeout(() => {
            onClickHandlerForRate()
        }, 4000)
    }

    return (
        <div className={cn(styles.error, styleWind==='success'&&styles.success)} data-test-id='error'>
            <div className={styles.icon}>{styleWind==='success'?<img src={success} alt="success"/>:<img src={warning} alt="warning"/>}</div>
            <div className={styles.text}>{text}</div>
            <button data-test-id='alert-close' type='button' onClick={rate?onClickHandlerForRate:onClickHandlerForBooking}><img className={styles.icon} src={close} alt="close"/></button>
        </div>
    );
};


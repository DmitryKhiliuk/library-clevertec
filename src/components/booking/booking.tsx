import {useState} from 'react';

import {selectBook, selectBookId, selectBookingId, selectBookStatus} from '../../common/selectors';
import {bookingTC, deleteBookingTC, reBookingTC} from '../../redux/book-reducer';
import {showModalAC} from '../../redux/booking-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {BookingCancelButton, Button} from '../buttons';
import {Calendar} from '../calendar';
import {Modal} from '../modal';

import styles from './booking.module.scss';

export const Booking = () => {

    const dispatch = useAppDispatch()
    const bookId = useAppSelector(selectBookId)
    const bookStatus = useAppSelector(selectBookStatus)
    const bookingId = useAppSelector(selectBookingId)
    const book = useAppSelector(selectBook)
    const id = localStorage.getItem('id')
    const [date, setDate] = useState('')

    const [disable, setDisable] = useState(true)


    const onClickButtonBookingHandler = () => {
        if (bookStatus === 'free'){
            dispatch(showModalAC(''))
            dispatch(bookingTC({data: {order: true, dateOrder: date, customer: +id!, book: bookId!}}))
        }
        if (bookStatus === 'booking') {
            dispatch(showModalAC(''))
            dispatch(reBookingTC({data:{data:{order: true, dateOrder: date, customer: +id!, book: bookId!}}, bookingId}))
        }

    }

    const onClickButtonCancelHandler = () => {
        dispatch(showModalAC(''))
        dispatch(deleteBookingTC({bookingId}))
    }

    const getDateFromCalendar = (dateFromCalendar:string) => {
        setDisable(false)
        setDate(dateFromCalendar)
    }

    return (
        <div className={styles.main}>
           <Modal content="booking">
               {bookStatus==='free' &&
                   <div className={styles.content} >
                       <div data-test-id='booking'>
                           <div className={styles.title} data-test-id='modal-title'><h4>Выбор даты
                               бронирования</h4></div>
                           <Calendar getDateFromCalendar={getDateFromCalendar}/>
                           <Button data-test-id='booking-button' size='large' type='submit'
                                   name='Забронировать' callBack={onClickButtonBookingHandler}
                                   disableButton={disable}/>
                           <div className={styles.space}/>
                       </div>
                   </div>
               }
               {bookStatus==='booking' &&
                   <div className={styles.content} data-test-id='booking'>
                       <div className={styles.title} data-test-id='modal-title'><h4>Изменение даты бронирования</h4></div>
                       <Calendar getDateFromCalendar={getDateFromCalendar} />
                       <Button data-test-id='booking-button' size='large' type='submit' name='Забронировать' callBack={onClickButtonBookingHandler} disableButton={disable}/>
                       <div className={styles.space}/>
                       <BookingCancelButton data-test-id='booking-cancel-button' size='large' type='submit' name='Отменить бронь' bookingCancel={true} callBack={onClickButtonCancelHandler}/>
                       <div className={styles.space}/>
                   </div>
               }

           </Modal>
        </div>
    );
};


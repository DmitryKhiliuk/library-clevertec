import cn from 'classnames';

import cat from '../../assets/icons/cat-crd.svg'
import {HOST} from '../../common/routes';
import {selectBooksId, selectModal, selectUser} from '../../common/selectors';
import {UserCommentType} from '../../common/types';
import {deleteBookingTC, fetchBook} from '../../redux/book-reducer';
import {
    addBookIdAC,
    addBookingIdAC,
    addBookStatusAC,
    addDateOrderAC,
    showModalAC
} from '../../redux/booking-reducer';
import {fetchCategories} from '../../redux/nav-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {currentComment} from '../../redux/user-reducer';
import {formatDate, formatDateForCard} from '../../utils/format-date';
import {BookingProfileButton, BookingProfileRateButton, Button} from '../buttons';
import {RatingForModal} from '../rating';

import styles from './card.module.scss'


export type BookComponentType = {
    id : number
    grid: boolean
    value?: string
    profile?: boolean
    deliveryDate?: boolean
    rate?: boolean

}



export const Card = ({id, grid, value, profile, deliveryDate, rate}: BookComponentType) => {

    const book = useAppSelector((state) => selectBooksId(state,id))
    const user = useAppSelector(selectUser)
    // const bookingId = useAppSelector((state) => selectBooksIdForCard(state,id))
    const modal = useAppSelector(selectModal)
    const dispatch = useAppDispatch()
    const bookingId = user!.booking?.id
    const bookId = id


    const light = (str: string) => {
        if (!value) return str
        const regexp = new RegExp(value, 'ig')
        const matchValue = str.match(regexp)

        if (matchValue) {
            const result = str.split(regexp)

            return result.map((el, index, array) => index < array.length - 1?
                <div key={el}>{}<span  style={{display: 'inline'}}>{el}<span data-test-id='highlight-matches' style={{color: '#FF5253', display: 'inline'}}>{matchValue.shift()}</span></span></div>:
                <div key={el}>{}<span  style={{display: 'inline'}}>{el}</span></div>)

        }

        return str
    }

    const onClickButtonHandler = () => {
        dispatch(showModalAC('booking'))
        dispatch(addBookIdAC(id))
        dispatch(addBookStatusAC(book!.booking ? 'booking' : 'free'))
        dispatch(addDateOrderAC(book!.booking?.dateOrder))
        dispatch(addBookingIdAC(book!.booking?.id))
    }



    const onClickCancel = () => {
        if (bookingId) {
            dispatch(deleteBookingTC({bookingId}))
            dispatch(fetchCategories())
        }
    }

     /* const dateISO = book!.delivery?.dateHandedTo
    const dateTimestamp = Date.parse(dateISO!)
    const day = new Date(dateTimestamp).getDate()
    const month = `${0}${new Date(dateTimestamp).getMonth() + 1 }`
    const dateForButton = `${day}.${month}` */
    const dateForButton = formatDate(book&&book.delivery?.dateHandedTo)
    const dateForCard = formatDateForCard(user!.delivery?.dateHandedTo)

    const onClickHandlerForComments = () => {
        dispatch(showModalAC('rate'))
        dispatch(addBookIdAC(id))
        dispatch(addBookStatusAC('rate'))
    }
    let comment: UserCommentType | undefined

    if (user.comments) {
        comment = user.comments.find((el) => el.bookId === bookId )
    }

    const onClickHandlerForRateButton = () => {
        dispatch(showModalAC('rate'))
        dispatch(fetchBook({bookId}))
        dispatch(addBookStatusAC('rate'))

    }

    const onClickHandlerForChangeRateButton = () => {
        dispatch(fetchBook({bookId}))
        dispatch(showModalAC('rate'))
        dispatch(addBookIdAC(id))
        dispatch(addBookStatusAC('changeRate'))
        dispatch(currentComment(comment!))
    }


    return (
        <div data-test-id='card'>
            {grid ?
                <div className={cn(styles.bookBlockGrid, profile && styles.slider)}>
                    <div className={styles.image}>
                        <img src={book&&book.image ? (`${HOST}${ book&&book.image.url}`) : cat}
                                  alt="img"/>
                    </div>
                    <div className={styles.subBlock}>
                        <div className={styles.ratingBook} onClick={onClickHandlerForComments} tabIndex={0} role='button' onKeyDown={onClickHandlerForComments} >
                            <RatingForModal count={book!&&book.rating}/>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.title}><span>{light(book!&&book.title)}</span></div>
                            <div>
                                <div className={styles.author}>{book&&book.authors.map((el) => <span key={el}>{light(el)}, </span> )}{book&&book.issueYear}</div>
                            </div>
                        </div>
                        <div className={styles.button} >
                            {profile && !comment && <BookingProfileRateButton size="small"
                                                                  name='оставить отзыв'
                                                                  callBack={onClickHandlerForRateButton}/>}
                            {profile && comment && <BookingProfileRateButton size="small"
                                                                  name='изменить оценку'
                                                                  callBack={onClickHandlerForChangeRateButton}
                                                                  bookingCancel={true}/>}
                            {!profile  && <Button booking={book!.booking}
                                                              delivery={book!.delivery}
                                                              size="small"
                                                              callBack={onClickButtonHandler}
                                                              date={dateForButton}
                            />}

                            {/* {!profile ?
                            <Button booking={booking}
                                    delivery={delivery}
                                    size="small"
                                    callBack={onClickButtonHandler}
                                    date={dateForButton}
                                    /> :
                            <BookingProfileRateButton size="small"
                                                      name='оценить'
                                                      callBack={onClickHandlerForRateButton}/>} */}
                        </div>
                    </div>
                </div> :
                <div className={styles.bookBlockRow}>
                    <div className={styles.imageRow}>
                        <div><img src={book&&book.image ? (`${HOST}${ book&&book.image.url}`):cat} alt="img"/></div>
                    </div>
                    <div className={styles.subBlockRow}>
                        <div className={styles.descriptionRow}>
                            <div className={styles.titleRow}><span>{light(book!&&book.title)}</span></div>
                            <div className={styles.authorRow}>{book&&book.authors.map((el) => <span key={el}>{light(el)}, </span> )}{book&&book.issueYear}</div>
                        </div>
                        <div className={styles.actionRow}>
                            <div className={styles.ratingBookRow}>
                                <RatingForModal count={book!&&book.rating}/>
                            </div>
                            <div className={styles.buttonRow}>
                                {!profile && !deliveryDate && <Button booking={book!.booking}
                                            delivery={book!.delivery}
                                            size="small"
                                            callBack={onClickButtonHandler}
                                            date={dateForButton}
                                        />}
                                {profile && !deliveryDate &&
                                    <BookingProfileButton
                                            size="small"
                                            name='отменить бронь'
                                            callBack={onClickCancel}
                                            date={dateForButton}
                                    />}
                                {deliveryDate && <div className={styles.date}>{`Возврат ${dateForCard}`}</div>}

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


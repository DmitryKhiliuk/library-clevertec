import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import empty from '../../assets/icons/cat.svg'
import comClose from '../../assets/icons/comment_close.svg'
import comOpen from '../../assets/icons/comment_open.svg'
import {selectBook, selectBooks, selectCategories, selectStatus} from '../../common/selectors';
import {CommentType} from '../../common/types';
import {Button, RateButton} from '../../components/buttons';
import {Comment} from '../../components/comment';
import {RatingForModal} from '../../components/rating';
import {MobileSlider, Slider} from '../../components/slider';
import {Table} from '../../components/table';
import {fetchBook} from '../../redux/book-reducer';
import {
    addBookIdAC,
    addBookingIdAC,
    addBookStatusAC,
    addDateOrderAC,
    showModalAC
} from '../../redux/booking-reducer';
import {fetchBooks} from '../../redux/books-reducer';
import {fetchCategories} from '../../redux/nav-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {fetchUser} from '../../redux/user-reducer';

import styles from './book-page.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export type DataBookType = { [key: string]: string | string[] }

export const BookPage = () => {


    const {id, category} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const bookId = +id!

    const book = useAppSelector(selectBook)
    const books = useAppSelector(selectBooks) as any
    const status = useAppSelector(selectStatus)
    const categories = useAppSelector(selectCategories)
    const userId = localStorage.getItem('id')

    const [comment, setComment] = useState(false)

    const myComment = book.comments?.find((el) => el.user.commentUserId === +userId!)


    useEffect(() => {
        if (myComment) {
            setComment(true)
        }
    }, [comment, myComment])


    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchBook({bookId}))
        dispatch(fetchBooks())
        dispatch(fetchUser())
    }, [dispatch, bookId])


    const [commentOpen, setCommentOpen] = useState(true)

    const onClickHandler = () => {
        setCommentOpen(!commentOpen)
    }


    const dataBook: DataBookType = {
        'Издательство': book.publish,
        'Год издания': book.issueYear,
        'Страниц': book.pages,
        'Переплёт': book.cover,
        'Формат': book.format,
        'Жанр': book.categories,
        'Вес': book.weight,
        'ISBN': book.ISBN,
        'Изготовитель': book.producer
    }




    const keysForLeftTable = Object.keys(dataBook).splice(0, 5)
    const keysForRightTable = Object.keys(dataBook).splice(5, 8)

    const dateISO = book!.delivery?.dateHandedTo
    const dateTimestamp = Date.parse(dateISO!)
    const day = new Date(dateTimestamp).getDate()
    const month = `${0}${new Date(dateTimestamp).getMonth() + 1 }`
    const dateForButton = `${day}.${month}`

    const onClickHandlerForCrumbs = () => {
       navigate(-1)
    }

    const categoryForCrumbs = categories.find(el => el.path === category)?.name

    const onClickButtonHandler = () => {
        dispatch(showModalAC('booking'))
        dispatch(addBookIdAC(id))
        dispatch(addBookStatusAC(book.booking ? 'booking' : 'free'))
        dispatch(addDateOrderAC(book!.booking?.dateOrder))
        dispatch(addBookingIdAC(book!.booking?.id))
    }

    const onClickHandlerForComments = () => {
        dispatch(showModalAC('rate'))
        dispatch(addBookIdAC(id))
        dispatch(addBookStatusAC('rate'))
    }

    const sortComment: CommentType[] = []

    book.comments?.map((el) => sortComment.unshift(el))



    return (
        <section className={styles.bookPage} >
            <div className={styles.container} >
                {status !== 'loading' &&
                    <div className={styles.breadCrumbs}>
                        <button type='button' data-test-id='breadcrumbs-link'
                                onClick={onClickHandlerForCrumbs}>
                            {categoryForCrumbs?categoryForCrumbs:'Все книги'}
                        </button>
                        <span> / </span>
                        <span data-test-id='book-name'>{Object.keys(book).length > 0 && book!.title}</span>
                    </div>
                }
                {Object.keys(book).length > 0 && <React.Fragment>
                    <div className={styles.mainBlock}>
                        <div className={styles.img}>
                            {book.images ?
                                <div className={styles.slider}>{window.innerWidth > 824 ?
                                    <Slider/> : <MobileSlider/>}</div> :
                                <div className={styles.empty}><img src={empty} alt="cat"/></div>}
                        </div>
                        <div className={styles.description}>
                            <h3 className={styles.title} data-test-id='book-title'>
                                {book.title}
                            </h3>
                            <h5 className={styles.author}>
                                {book.authors && book.authors.reduce((acc: string, number) => acc + number, '')}{`, ${book.issueYear}`}
                            </h5>
                            <div className={styles.button} >
                                <Button booking={book.booking}
                                        delivery={book.delivery}
                                        size='large'
                                        callBack={onClickButtonHandler}
                                        date={dateForButton}

                                        />
                            </div>
                        </div>
                        <div className={styles.annotation}>
                            <h5 className={styles.title}>О книге</h5>
                            <div className={styles.text}>
                                {book.description}
                            </div>
                        </div>
                    </div>
                    <div className={styles.rating}>
                        <h5 className={styles.title}>Рейтинг</h5>
                        <div className={styles.visibleRating}>
                            <div className={styles.stars}><RatingForModal count={book.rating}/></div>
                            <h5 className={styles.total}>
                                {book.rating}
                            </h5>
                        </div>
                    </div>
                    <div className={styles.detail}>
                        <h5 className={styles.title}>Подробная информация</h5>
                        <div className={styles.table}>
                            <div className={styles.tableLeft}><Table data={dataBook}
                                                                     keys={keysForLeftTable}/></div>
                            <div className={styles.tableRight}><Table data={dataBook}
                                                                      keys={keysForRightTable}/>
                            </div>
                        </div>

                    </div>
                    <div data-test-id='reviews'>
                        <div className={styles.comments}>
                            <div className={styles.commentsTitleBlock}>
                                <h5 className={styles.title}>Отзывы</h5>
                                <div className={styles.count}>{book.comments?.length || 0}</div>
                                <button type='button' onClick={onClickHandler}
                                        className={styles.btn}
                                        data-test-id='button-hide-reviews'><img
                                    src={commentOpen ? comOpen : comClose} alt="open"/></button>
                            </div>
                            {commentOpen && <div> {book.comments && sortComment.map((el:CommentType) => <Comment key={el.id} comment={el}/>)}</div>}
                        </div>
                        <div className={`${styles.button} ${styles.buttonGrade}`}>
                            <RateButton data-test-id='button-rate-book' name={comment ? 'изменить оценку' : 'оценить книгу'} size='large'
                                    callBack={onClickHandlerForComments} bookingCancel={comment}/>
                        </div>
                    </div>
                </React.Fragment>}

            </div>

        </section>
    );
}

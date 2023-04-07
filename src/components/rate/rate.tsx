import {ChangeEvent, useState} from 'react';

import {
    selectBook,
    selectBookError,
    selectBookId,
    selectBookStatus,
    selectComment
} from '../../common/selectors';
import {changeCommentTC, commentTC} from '../../redux/book-reducer';
import {showModalAC} from '../../redux/booking-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ButtonComment} from '../buttons';
import {Modal} from '../modal';
import {RatingForModal} from '../rating';

import styles from './rate.module.scss';

export const Rate = () => {

    const dispatch = useAppDispatch()
    const bookId = useAppSelector(selectBookId)
    const status = useAppSelector(selectBookStatus)
    const book = useAppSelector(selectBook)
    const comment = useAppSelector(selectComment)
    const error = useAppSelector(selectBookError)

    const commentId = book.comments?.find((el) => el.id)

    const id = localStorage.getItem('id')

    const [count, setCount] = useState(0)
    const [value, setValue] = useState('')


    const onClickButtonRateHandler = () => {
        dispatch(showModalAC(false))
        dispatch(commentTC({data: {rating: count, text: value, user: +id!, book: bookId!}}))
    }
    const onClickButtonChangeRateHandler = () => {
        dispatch(showModalAC(false))
        dispatch(changeCommentTC({data: {rating: count, text: value, user: +id!, book: bookId!}, commentId: comment!.id}))
    }

    const getRating = (rate: number) => {
        setCount(rate)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    return (
        <div className={styles.main}>
            <Modal content="rate">
                <div className={styles.content} >
                    <div className={styles.title} data-test-id='modal-title'><h4>{status==='rate' ? 'Оцените книгу' : 'Хотите изменить оценку?'}</h4>
                    </div>
                    <RatingForModal getRating={getRating} count={count} modal={true}/>
                    <textarea data-test-id='comment' className={styles.area} value={value}
                              onChange={onChangeHandler} placeholder='Оставить отзыв'/>
                    <ButtonComment data-test-id=' button-comment' size='large' type='submit' name='оценить'
                            callBack={status==='rate' ? onClickButtonRateHandler : onClickButtonChangeRateHandler}/>
                    <div className={styles.space}/>
                </div>
            </Modal>
        </div>
    );
};


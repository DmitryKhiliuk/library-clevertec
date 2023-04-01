import cn from 'classnames';

import emptyStar from '../../assets/icons/emptyStar.svg'
import emptyStarBig from '../../assets/icons/modal/Icon_empty_star.svg'
import starBig from '../../assets/icons/modal/Icon_star.svg'
import star from '../../assets/icons/star.svg'

import styles from './rating-for-modal.module.scss'

type RatingForModalType = {
    getRating?: (rate: number) => void
    count: number
    modal?: boolean
}

export const RatingForModal = ({getRating, count, modal}: RatingForModalType) => {
    const rates = [1, 2, 3, 4, 5]

    const onClickHandler = (rate: number) => {
        getRating!(rate)
    }

    return (
        <div className={cn(modal ? styles.main : styles.mainForPage)} data-test-id='rating'>
            {modal&&<div className={styles.title}>Ваша оценка</div>}
            <div className={styles.rate}>{rates.map((el) => <button key={el} data-test-id='star' type='button' onClick={() => onClickHandler(el)}>
                    {count + 1 <= el ?
                        <img src={modal ? emptyStarBig : emptyStar} alt="empty"/> :
                        <img data-test-id='star-active' src={modal ? starBig : star} alt="star"/>}
                </button>)}
            </div>
        </div>
    );
};


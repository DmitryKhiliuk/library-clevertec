import {useCallback, useEffect, useMemo} from 'react';
import {redirect, useNavigate} from 'react-router-dom';
import {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {BOOK, HOST, MAIN} from '../../common/routes';
import {selectBook, selectBooks, selectUser} from '../../common/selectors';
import {resetBookAC} from '../../redux/book-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {fetchBooksForSlider} from '../../redux/user-reducer';
import {Card} from '../card';

import './slider.scss';

import 'swiper/css';
import 'swiper/css/pagination';

export const SliderHistory = () => {
    const user = useAppSelector(selectUser)
    const books = useAppSelector(selectBooks)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
   /* const b = books.filter((el) => el.categories[0] === 'Художественная литература')

    const getBooksForSlider = useCallback(() => {
        const booksSliderId:number[] = []
        b.forEach((el) => booksSliderId.push(el.id))
        booksSliderId.forEach((el) => dispatch(fetchBooksForSlider(el)))
    }, [b,dispatch]) */

    /* useEffect(() => {
        getBooksForSlider()
    }, [getBooksForSlider]) */

    const onClickHandler = (id: number) => {
        dispatch(resetBookAC({}))

        navigate(`/books/all/${id}`)
    }

    return (
        <div >
            <Swiper
                data-test-id='slide-big'
                spaceBetween={30}
                slidesPerView={4}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    user.history?.books.map((item) => (
                        <SwiperSlide  key={item.id} data-test-id='history-slide' >
                            <div  tabIndex={0} role='button' aria-label='button'
                                 onClick={() => onClickHandler(item.id)}
                                 onKeyDown={() => onClickHandler(item.id)}><Card id={item.id} grid={true} profile={true}/></div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};


import {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {HOST} from '../../common/routes';
import {selectBook} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';

import './slider.scss';

import 'swiper/css';
import 'swiper/css/pagination';


export const MobileSlider = () => {
    const book = useAppSelector(selectBook)

    return (
        <div>
            <Swiper
                data-test-id='slide-big'
                spaceBetween={1}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    book.images.map((item) => (
                        <SwiperSlide key={item.url} data-test-id='slide-mini'>
                            <img src={(`${HOST}${item.url}`)}
                                 alt="product images"/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>

    )
}

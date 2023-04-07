import {useState} from 'react';
import {Navigation, Thumbs} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {HOST} from '../../common/routes';
import {selectBook} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';

import './slider.scss'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


export const Slider = () => {

    const [activeThumb, setActiveThumb] = useState<any>(null)

    const book = useAppSelector(selectBook)

    const imagesBlock = () => book.images.map((item) => (
        <SwiperSlide key={item.url}>
            <img src={(`${HOST}${item.url}`)} alt="product images" data-test-id='slide-mini'/>
        </SwiperSlide>
    ))

    return (
        <div>
            <Swiper
                data-test-id='slide-big'
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Thumbs]}
                grabCursor={true}
                thumbs={{swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null}}
                className='product-images-slider'
            >
                <div>{imagesBlock()}</div>
            </Swiper>
            {book.images.length > 1 && <Swiper
                onSwiper={setActiveThumb}
                loop={true}
                spaceBetween={35}
                slidesPerView={5}
                modules={[Navigation, Thumbs]}
                className='product-images-slider-thumbs'
            >
                <div >{imagesBlock()}</div>

            </Swiper>}

        </div>
    );
};



import {ChangeEvent, useEffect, useRef, useState} from 'react';

import defaultAva from '../../assets/avatar/defaultAva.svg'
import intersect from '../../assets/avatar/Intersect.svg'
import photo from '../../assets/avatar/photo-icon.svg'
import {HOST} from '../../common/routes';
import {selectUser} from '../../common/selectors';
import {Card} from '../../components/card';
import {SliderHistory} from '../../components/slider/slider-history';
import {SubtitleProfile} from '../../components/subtitle-profile';
import {UserBookInfo} from '../../components/user-book-info';
import {UserData} from '../../components/user-data';
import {fetchBooks} from '../../redux/books-reducer';
import {fetchCategories} from '../../redux/nav-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {addAvatar, fetchUser} from '../../redux/user-reducer';

import styles from './profile.module.scss';


export const Profile = () => {

    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    const filePicker = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<null|File>(null)


    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchBooks())
        dispatch(fetchUser())


    },[dispatch])

    const formData = new FormData()


    const onClickHandler =() => {
        filePicker.current!.click()
    }

    const handleUpload = () => {
        formData.append('files', file!)
        dispatch(addAvatar({formData}))
    }

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files![0]!)

    }

    if(file) {
        formData.append('files', file!)
        dispatch(addAvatar({formData}))
        setFile(null)
    }

    const date = new Date().getTime()
    const bookDate = user.booking?.dateOrder
    const deliveryDate = user.delivery?.dateHandedTo
    const order = Date.parse(bookDate!)
    const diliv = Date.parse(deliveryDate!)
    const restBookingTime = order + 75600000 - date
    const restDeliveryTime = diliv + 75600000 - date


    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.mainInfo} data-test-id='profile-avatar'>
                        <button type='button' className={styles.avatar} onClick={onClickHandler} >
                            <img className={styles.image} src={user.avatar ? `${HOST}${user.avatar}` : defaultAva} alt="avatar"/>
                            <img className={styles.intersect} src={intersect} alt="int"/>
                            <img className={styles.photo} src={photo} alt=""/>
                        </button>
                        <input className={styles.input} type="file" ref={filePicker} onChange={onChangeHandler}/>
                        <div className={styles.userName}>
                            <div>{user.firstName}</div>
                            <div>{user.lastName}</div>
                        </div>
                </div>
                <div className={styles.userData}>
                    <SubtitleProfile title='Учётные данные' description='Здесь вы можете отредактировать информацию о себе'/>
                    <div>
                        <UserData/>
                    </div>
                </div>
                <div>
                    <SubtitleProfile title='Забронированная книга' description='Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь'/>
                    {restBookingTime <= 0 && <UserBookInfo title='Дата бронирования книги истекла' text='Через 24 часа книга будет  доступна всем' info='warning'/>}
                    {user.booking?.book ? <Card id={user.booking.book.id} grid={false} profile={true}/> : <UserBookInfo title='Забронируйте книгу и она отобразится' info='info'/>}
                </div>
                <div>
                    <SubtitleProfile title='Книга которую взяли' description='Здесь можете просмотреть информацию о книге и узнать сроки возврата'/>
                    {restDeliveryTime <= 0  && <UserBookInfo title='Вышел срок пользования книги ' text='Верните книгу, пожалуйста' info='warning'/>}
                    {user.delivery?.book ?  <Card id={user.delivery.book.id} grid={false} deliveryDate={true}/> : <UserBookInfo title='Прочитав книгу, она отобразится в истории ' info='info'/>}
                </div>
                 <div data-test-id='history'>
                    <SubtitleProfile title='История' description='Список прочитанных книг'/>
                     {user.history?.books ?
                         <SliderHistory/>:
                         <UserBookInfo title='Вы не читали книг из нашей библиотеки ' info='info'/>}
                </div>
            </div>
        </div>
    );
};


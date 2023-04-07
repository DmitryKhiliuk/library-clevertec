import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import cn from 'classnames';

import avatar from '../../assets/avatar/avatar.png'
import defaultAva from '../../assets/avatar/defaultAva.svg'
import logo from '../../assets/logo/logo.svg'
import {
    BOOKING,
    BOOKING_ERROR,
    CHANGE,
    CHANGE_ERROR, CHANGE_RATE, CHANGE_RATE_ERROR,
    DELETE_BOOKING, DELETE_ERROR,
    MAIN_ALERT, PHOTO, PHOTO_ERROR, RATE, RATE_ERROR
} from '../../common/alerts-text';
import {AUTH, HOST, MAIN, PROFILE} from '../../common/routes';
import {
    selectChangeOrder, selectChangeRate,
    selectDeleteOrder,
    selectOrder, selectPhoto,
    selectRate,
    selectStatus, selectUser
} from '../../common/selectors';
import {useAppSelector} from '../../redux/store';
import {ButtonBurger} from '../buttons';
import {Error} from '../snackbar';

import styles from './header.module.scss'


type HeaderType = {
    toggle: boolean
    setToggle: (event:React.MouseEvent<HTMLButtonElement>) => void
}



export const Header = ({toggle, setToggle}: HeaderType) => {
    const status = useAppSelector(selectStatus)
    const order = useAppSelector(selectOrder)
    const changeOrder = useAppSelector(selectChangeOrder)
    const deleteOrder = useAppSelector(selectDeleteOrder)
    const rate = useAppSelector(selectRate)
    const changeRate = useAppSelector(selectChangeRate)
    const photo = useAppSelector(selectPhoto)
    const user = useAppSelector(selectUser)
    const navigate = useNavigate()

    const onClickHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        setToggle(event)
    }

    const [menu, setMenu] = useState(false)

    const location = useLocation();

    const onClickHandlerForMenu = () => {
       setMenu(!menu)
    }

    const onClickHandlerExit = () => {
        localStorage.clear();
        navigate(AUTH)
    }

    const toProfileTransition = () => {
        navigate(PROFILE)
        setMenu(false)
    }


    return (
        <section className={styles.header}>
            <div className={styles.container}>
                {status==='failed'&&!order&&!changeOrder&&!deleteOrder&&!rate&&<Error styleWind='error' text={MAIN_ALERT}/>}
                {order==='success'&&<Error styleWind='success' text={BOOKING}/>}
                {order==='failed'&&<Error styleWind='error' text={BOOKING_ERROR}/>}
                {changeOrder==='success'&&<Error styleWind='success' text={CHANGE}/>}
                {changeOrder==='failed'&&<Error styleWind='error' text={CHANGE_ERROR}/>}
                {deleteOrder==='success'&&<Error styleWind='success' text={DELETE_BOOKING}/>}
                {deleteOrder==='failed'&&<Error styleWind='error' text={DELETE_ERROR}/>}
                {rate==='success'&&<Error styleWind='success' text={RATE}/>}
                {rate==='failed'&&<Error styleWind='error' text={RATE_ERROR}/>}
                {changeRate==='success'&&<Error styleWind='error' text={CHANGE_RATE}/>}
                {changeRate==='failed'&&<Error styleWind='error' text={CHANGE_RATE_ERROR}/>}
                {photo==='success'&&<Error styleWind='success' text={PHOTO}/>}
                {photo==='failed'&&<Error styleWind='error' text={PHOTO_ERROR}/>}
                <div className={styles.headerSide}>
                    <Link to={MAIN}><img src={logo} alt="logo"/></Link>
                </div>
                <div className={styles.header__main} >
                    <div data-test-id='button-burger' className={styles.menu}>
                        <ButtonBurger toggle={toggle} callBurger={onClickHandler}/>
                    </div>
                    <h3 className={styles.title}>{location.pathname === '/profile'? 'Личный кабинет' : 'Библиотека'}</h3>
                    <div className={styles.user}>
                        <h3 className={styles.greeting} >{`Привет, ${user.firstName}`}</h3>
                        <div className={styles.avaBox} onMouseOver={onClickHandlerForMenu} onFocus={onClickHandlerForMenu} onClick={onClickHandlerForMenu} onKeyDown={onClickHandlerForMenu} role='button' tabIndex={0}>
                            <img src={user.avatar ? `${HOST}${user.avatar}` : defaultAva} alt="avatar" className={styles.avatar}/>
                        </div>

                    </div>

                </div>
                <div className={cn(styles.menuHeader, !menu && styles.menuHidden)}>
                            <div className={styles.menuContent}>
                                <button data-test-id='profile-button' className={styles.menuButton} type='button' onClick={toProfileTransition}><h5>Профиль</h5></button>
                                <button className={styles.menuButton} type='button' onClick={onClickHandlerExit}><h5>Выход</h5></button>
                            </div>

                </div>
            </div>
        </section>
    );
}

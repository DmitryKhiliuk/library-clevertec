import React, {useEffect, useRef, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import cn from 'classnames';

import {AUTH} from '../../common/routes';
import {selectModal, selectStatus} from '../../common/selectors';
import {authAC} from '../../redux/app-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Booking} from '../booking';
import {Footer} from '../footer';
import {Header} from '../header';
import {Loader} from '../loader';
import {NavBurger} from '../nav-books';
import {Rate} from '../rate';

import styles from './layout.module.scss'


export const Layout = React.memo(() => {


    const status = useAppSelector(selectStatus)
    const modal = useAppSelector(selectModal)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [toggleBurgerMenu, setToggleBurgerMenu] = useState(false)
    const toggleMenuHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setToggleBurgerMenu(!toggleBurgerMenu)
    }

    const jwt = localStorage.getItem('jwt')

    useEffect(() => {
        if (jwt) {
            dispatch(authAC({auth: true}))
        } else {
            navigate(AUTH)
        }
    }, [jwt, dispatch, navigate])





    const dropDownRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        function handler(event: { target: (Node|EventTarget|null) ; } ) {
            if(!dropDownRef.current?.contains(event.target as Node| null ) ) {
                setToggleBurgerMenu(false);
            }
        }
        window.addEventListener('click', handler)

        return () => window.removeEventListener('click', handler)
    }, []);



    return (
        <div className={cn(styles.layout)} data-test-id='main-page'>
            {status === 'loading' && <div ><Loader/></div>}
            {status === 'loading' && <div className={styles.loader}> </div>}
            {modal === 'booking' && <Booking/>}
            {modal === 'rate' && <Rate/>}
            <header ><Header toggle={toggleBurgerMenu} setToggle={toggleMenuHandler}/></header>
            <div ref={dropDownRef}  className={cn(styles.burgerMenuOpen, !toggleBurgerMenu && styles.burgerMenuClose)}>
                <NavBurger callBurger={toggleMenuHandler}/>
            </div>
            <main>
                <Outlet/>
            </main>
            <footer><Footer/></footer>
        </div>
    );
})






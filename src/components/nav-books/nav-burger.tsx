import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import cn from 'classnames';

import close from '../../assets/icons/menu-close.svg';
import open from '../../assets/icons/menu-open.svg';
import {AGREEMENT, ALL_BOOKS, AUTH, BOOKS, PROFILE, RULES} from '../../common/routes';
import {selectBooks, selectCategories, selectStatus} from '../../common/selectors';
import {setAppStatusAC} from '../../redux/app-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import styles from './nav-books.module.scss'

type NavBoxType = {

    callBurger: (event:React.MouseEvent<HTMLButtonElement>) => void
}

export const NavBurger = ({callBurger}: NavBoxType) => {

    const categories = useAppSelector(selectCategories)
    const books = useAppSelector(selectBooks)
    const status = useAppSelector(selectStatus)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [showcase, setShowcase] = useState(true)

    const onClickHandler = () => {
        setShowcase(!showcase)
    }

    const toggleHandler = (event:React.MouseEvent<HTMLButtonElement> ) => {
        dispatch(setAppStatusAC({status: 'idle'}))
        callBurger(event)
        setShowcase(false)
        localStorage.clear();
        navigate(AUTH)
    }


    const closeMenu = (event:React.MouseEvent<HTMLButtonElement>) => {
        callBurger(event)
        setShowcase(false)
    }

    const toggleHandlerForMenuItems = (event:React.MouseEvent <HTMLButtonElement>) => {
        callBurger(event)
        setShowcase(true)
    }

    const setActiveMenuItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.menuItems} ${styles.menuActive}` : styles.menuItems
    const setActiveMenuAdditionalItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.menuItems} ${styles.menuActive} ${styles.additionalItems}` : `${styles.menuItems} ${styles.additionalItems}`
    const setActiveSubmenuItem = (navElement: { isActive: boolean }) => navElement.isActive ? `${styles.subMenuItems} ${styles.subMenuActive}` : styles.subMenuItems

    return (
        <section className={styles.nav_books}>
            <div className={styles.list}>
                <div data-test-id='burger-showcase' onClick={onClickHandler} onKeyDown={onClickHandler} role='button' tabIndex={0}>
                    <NavLink to={BOOKS} style={{marginTop: 0, marginBottom: '8px'}}  className={setActiveMenuItem} >
                        <h5>Витрина книг</h5>
                    </NavLink>
                    <img src={showcase?open:close} alt="menu"/>
                </div>
                {status === 'succeeded' &&
                    <div>
                        <div data-test-id='burger-books' style={{width: '200px'}}>
                            {showcase &&<button  type='button' onClick={toggleHandlerForMenuItems} >
                                                <NavLink  to={ALL_BOOKS}  className={setActiveSubmenuItem} style={{marginLeft: '24px'}}>
                                                    Все книги
                                                </NavLink>
                                        </button>}</div>
                        <div >{showcase && categories.map((el) => (
                            <div  key={el.id} className={styles.item}>
                                <button  type='button' onClick={toggleHandlerForMenuItems}> <NavLink to={`/books/${el.path}`} data-test-id={`burger-${el.path}`} className={setActiveSubmenuItem}
                                >{el.name}</NavLink></button>
                                {books.length > 1 && <span
                                    className={styles.count}
                                    data-test-id={`burger-book-count-for-${el.path}`}>{books.filter((book) => book.categories.find((ctgrs) => ctgrs === el.name)).length}

                            </span> }
                            </div>)
                        )}
                        </div>
                    </div>}
                <button onClick={closeMenu} type='button'><NavLink to={RULES} className={setActiveMenuItem}  data-test-id='burger-terms'
                ><h5>Правила пользования</h5></NavLink></button>
                <button onClick={closeMenu} type='button'><NavLink to={AGREEMENT} className={setActiveMenuItem}  data-test-id='burger-contract'><h5>Договор оферты</h5></NavLink>
                <div className={styles.line}> </div></button>
                <button onClick={closeMenu} type='button'><NavLink to={PROFILE} className={setActiveMenuAdditionalItem}><h5>Профиль</h5>
                </NavLink></button>
                <button data-test-id='exit-button' className={cn(styles.menuItems, styles.additionalItems)} type='button' onClick={toggleHandler}><h5>Выход</h5></button>
            </div>
        </section>
    );
}


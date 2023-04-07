import {Outlet} from 'react-router-dom';

import {NavBooks} from '../../components/nav-books';

import styles from './main-page.module.scss'


export const MainPage = () =>
    (
        <section className={styles.main_page} >
            <div className={styles.container}>
                <nav className={styles.nav_books}>
                    <NavBooks/>
                </nav>
                <section className={styles.main}>
                    <Outlet/>
                </section>
            </div>
        </section>
    );


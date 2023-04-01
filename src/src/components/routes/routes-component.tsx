import {Navigate, Route, Routes} from 'react-router-dom';

import {
    AGREEMENT,
    ALL_BOOKS, ANY_BOOKS,
    AUTH,
    BOOK,
    BOOKS,
    MAIN,
    PROFILE,
    RECOVERY,
    REG,
    RULES
} from '../../common/routes';
import {BookPage} from '../../pages/book';
import {MainPage} from '../../pages/main';
import {MainBlock} from '../../pages/main/main-block';
import {Terms} from '../../pages/main/terms';
import {Profile} from '../../pages/profile';
import {Auth} from '../auth/authorization';
import {Forgot} from '../auth/recovery';
import {Registration} from '../auth/registration';
import {Layout} from '../layout';



type RoutesMainType = typeof routesMain

const routesMain = [
    {path: AUTH, component: <Auth/>},
    {path: REG, component: <Registration/>},
    {path: RECOVERY, component: <Forgot/>},
]

const routesElements = [
    {path: BOOK, component: <BookPage/>},
    {path: PROFILE, component: <Profile/>},
]

const routesItems = [
    {path: MAIN, component: <Navigate to={BOOKS}/>},
    {path: BOOKS, component: <Navigate to={ALL_BOOKS}/>},
    {path: ANY_BOOKS, component: <MainBlock/>},
    {path: RULES, component: <Terms contentView ='rules'/> },
    {path: AGREEMENT, component: <Terms contentView = 'agreement'/>},
]

const mapingRoutes = (rout: RoutesMainType) => rout.map((el) => <Route path={el.path} element={el.component}/>)

export const RoutesComponent = () => (
        <div>
            <Routes>
                {mapingRoutes(routesMain)}
                <Route path={MAIN} element={<Layout/>}>
                    <Route path={MAIN} element={<MainPage/>}>
                        {mapingRoutes(routesItems)}
                    </Route>
                    {mapingRoutes(routesElements)}
                </Route>
            </Routes>
        </div>
    );


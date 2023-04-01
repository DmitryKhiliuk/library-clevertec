import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';

import {RoutesComponent} from './components/routes';
import {store} from './redux/store';
import {InterceptorApi} from './interceptor-api';

import './index.css';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <InterceptorApi/>
                <RoutesComponent/>
            </Provider>
        </HashRouter>
    </React.StrictMode>
);

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import {AUTH} from './common/routes';
import {useAppDispatch} from './redux/store';


export const InterceptorApi = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const interceptorId = useRef<number | null>(null);

    /* useEffect(() => {
        interceptorId.current = instance.interceptors.response.use(undefined, (error) => {
            if (error.response.status) {
                navigate(AUTH);
            }
        });

        return () => {
            instance.interceptors.response.eject(interceptorId.current as number);
        };
    }, [navigate, dispatch]); */

    return null;
};



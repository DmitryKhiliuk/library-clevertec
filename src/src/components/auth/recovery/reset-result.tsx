import {useNavigate} from 'react-router-dom';

import {AUTH, RECOVERY} from '../../../common/routes';
import {selectErrorStatus} from '../../../common/selectors';
import {setErrorAC} from '../../../redux/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {Button} from '../../buttons';

import styles from './resetResult.module.scss'


export const ResetResult = () => {

    const errorStatus = useAppSelector(selectErrorStatus)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (errorStatus) {
            dispatch(setErrorAC(''))
            navigate(RECOVERY)
        } else {
            navigate(AUTH)
        }
    }

    return (

        <div className={styles.content} data-test-id='status-block'>
            {errorStatus ?<h4 className={styles.title}> Данные не сохранились</h4> : <h4 className={styles.title}>Новые данные сохранены</h4>}
            <div className={styles.text}>{errorStatus ? 'Что-то пошло не так. Попробуйте ещё раз' : 'Зайдите в личный кабинет, используя свои логин и новый пароль'}</div>
            <Button size='large'
                    name={errorStatus ? 'Повторить' : 'Вход'}
                    callBack={onClickHandler}/>
        </div>


    );
};


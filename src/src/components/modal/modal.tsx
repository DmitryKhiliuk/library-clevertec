import {ReactNode} from 'react';
import cn from 'classnames';

import close from '../../assets/icons/modal/close.svg'
import {selectStatus} from '../../common/selectors';
import {showModalAC} from '../../redux/booking-reducer';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Loader} from '../loader';

import styles from './modal.module.scss';

type PropsType = {
    children: ReactNode
    content: 'auth' | 'booking' | 'rate'
}

export const Modal = ({children, content}:PropsType) => {

    const status = useAppSelector(selectStatus)
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(showModalAC(false))
    }


    return (
        <div className={cn(styles.main,( content === 'booking' || content === 'rate') && styles.mainBooking)} data-test-id='modal-outer' onClick={onClickHandler} onKeyDown={onClickHandler} tabIndex={0} role='button'>
            <div className={cn(styles.loader, status==='loading' && styles.visible)} ><Loader/></div>
            {status === 'loading' && <div className={styles.back}> </div>}
            {content === 'auth' && <h3 className={styles.text}>Cleverland</h3>}
            <div  className={styles.content} onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()} tabIndex={0} role='button'>
                {content === 'booking'  &&
                <div className={styles.children} data-test-id='booking-modal'>
                   <button data-test-id='modal-close-button' className={styles.close} type='button' onClick={onClickHandler}><img src={close} alt=""/> </button>
                    {children}
                </div>}
                {content === 'auth'  &&
                    <div className={styles.children} data-test-id='booking-modal'>
                        {children}
                    </div>}
                {content === 'rate' &&
                    <div className={styles.children} data-test-id='modal-rate-book'>
                        <button data-test-id='modal-close-button' className={styles.close}
                                type='button' onClick={onClickHandler}><img src={close} alt=""/>
                        </button>
                        {children}</div>
                }
            </div>
        </div>
    );
};


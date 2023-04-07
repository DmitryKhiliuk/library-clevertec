import cn from 'classnames'

import styles from './button-burger.module.scss'


type ButtonBurgerType = {
    callBurger: (event:React.MouseEvent<HTMLButtonElement>) => void
    toggle: boolean
}

export const ButtonBurger = ({callBurger, toggle}: ButtonBurgerType) => {

    const onClickHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        callBurger(event)
    }

    return (
        <button type='button' onClick={onClickHandler} className={cn(styles.button, toggle && styles.open)}>
            <span> </span>
            <span> </span>
            <span> </span>

        </button>
    );
};


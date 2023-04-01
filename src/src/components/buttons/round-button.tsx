import cn from 'classnames'

import styles from './round-button.module.scss'

type RoundButtonType = {
    callButton: () => void
    image: string
    className?: string
}

export const RoundButton = ({callButton, image, className}: RoundButtonType) => {
    const onClickHandler = () => {
        callButton()
    }

    return (
        <button  type='button' onClick={onClickHandler} className={cn(styles.button, className)}>
            <img src={image} alt=""/>
        </button>
    );
};





import gridOff from '../../assets/icons/button-icon/grid-off.svg';
import gridOn from '../../assets/icons/button-icon/grid-on.svg';
import rowOff from '../../assets/icons/button-icon/row-off.svg';
import rowOn from '../../assets/icons/button-icon/row-on.svg';
import {RoundButton} from '../buttons';

import styles from './display-view.module.scss'

type DisplayButtonType = {
    callBack: () => void
    gridContent: boolean
    purposeButton: string
}

export const DisplayView = ({callBack, gridContent, purposeButton}: DisplayButtonType) => {

    const btnStyleGrid = () => gridContent ? `${styles.btn} ${styles.activeBtn}` : `${styles.btn}`
    const grid = btnStyleGrid()
    const btnStyleRow = () => gridContent ? `${styles.btn}` : `${styles.btn} ${styles.activeBtn}`
    const row = btnStyleRow()

    const display = purposeButton === 'g' ? grid : row

    const onClickHandler = () => {
        callBack()
    }

    const image = display === row ? (gridContent?rowOff:rowOn) : (gridContent?gridOn:gridOff)

    return (
        <div>
            <RoundButton callButton={onClickHandler} image={image} className={display}/>
        </div>
    );
};



import filterDown from '../../assets/icons/filter/filter-grey-down.svg'
import filterUp from '../../assets/icons/filter/filter-grey-up.svg'

import styles from './filter-button.module.scss'

type FilterButtonType = {
    value: boolean
    callBack: () => void
}

export const FilterButton = ({value, callBack}: FilterButtonType) => {


    const onClickHandler = () => {
        callBack()
    }

   return <button type="button" className={styles.filter} onClick={onClickHandler} data-test-id='sort-rating-button'>
        <img src={value ? filterDown : filterUp} alt="filter"/>
        <div className={styles.text}>По рейтингу</div>
    </button>

};



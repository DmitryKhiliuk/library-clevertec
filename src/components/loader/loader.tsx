import loader from '../../assets/icons/loader.svg'

import styles from './loader.module.scss'

export const Loader = () => (
        <div className={styles.ring} data-test-id='loader'>
            <img src={loader} alt="loader"/>
        </div>
    );


import cn from 'classnames';

import styles from './user-book-info.module.scss';

type UserBookInfoType = {
    title: string
    info: string
    text?: string
}

export const UserBookInfo = ({title, info, text}:UserBookInfoType) => {
    const x = () => {

    }

    return (
        <div className={styles.main}>
            {info === 'info' ?
            <div className={styles.info} data-test-id='empty-blue-card'>
                <div className={styles.title}><h3>{title}</h3></div>
            </div> :
            <div className={cn(styles.info,styles.warning)} data-test-id='expired'>
                <div className={styles.title}><h3>{title}</h3></div>
                <div className={styles.text}>{text}</div>
            </div> }
        </div>
    );
};


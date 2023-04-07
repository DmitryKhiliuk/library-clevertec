import styles from './subtitle-profile.module.scss';

type PropsType = {
    title: string
    description: string
}

export const SubtitleProfile = ({title, description}: PropsType) => (
        <div className={styles.titleBlock}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.titleDescription}>{description}</div>
        </div>
    );


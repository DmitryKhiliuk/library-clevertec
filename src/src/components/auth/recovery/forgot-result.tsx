import styles from './forgotResult.module.scss'

export const ForgotResult = () => (
        <div className={styles.content} data-test-id='status-block'>
            <h4 className={styles.title}>Письмо выслано</h4>
            <div className={styles.text}>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</div>
        </div>
    );


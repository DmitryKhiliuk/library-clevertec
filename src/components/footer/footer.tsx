
import facebook from '../../assets/icons/social/facebook.svg'
import instagram from '../../assets/icons/social/instagram.svg'
import linkedin from '../../assets/icons/social/linkedin.svg'
import vk from '../../assets/icons/social/vk.svg'

import styles from './footer.module.scss'

export const Footer = () => (
        <section className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.text}>
                    © 2020-2023 Cleverland. Все права защищены.
                </div>
                <div className={styles.icons}>
                    <a href="https://ru-ru.facebook.com/"><img src={facebook} alt="fb"/></a>
                    <a href="https://www.instagram.com/"><img src={instagram} alt="fb"/></a>
                    <a href="https://vk.com/"><img src={vk} alt="fb"/></a>
                    <a href="https://www.linkedin.com/"><img src={linkedin} alt="fb"/></a>
                </div>
            </div>
        </section>
    );


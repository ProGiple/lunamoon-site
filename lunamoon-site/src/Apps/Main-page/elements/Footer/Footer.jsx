import styles from './Footer.module.scss'

export function Footer() {
    return (
        <div className={`${styles.footerBlock}`}>
            <div className={styles.footer}>
                <img src='./main-logo.png' />
                <h2>Сервер LunaMoon</h2>
                <br />
            </div>

            <h4 className={styles.sub}>
                © {(new Date).getFullYear()} LunaMoon — Все права защищены. LunaMoon не связан с MojangAB, все средства идут на развитие проекта.
            </h4>
        </div>
    )
}
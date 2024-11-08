import styles from './Header-styles.module.scss'

export function Header() {
    return (
        <>
            <div className={styles.headerBlock}>
                <div className={styles.flex_item}>
                    <img src='/main-logo.png' className={styles.img_mainLogo} />
                </div>
                
                <div className={styles.flex_item}>
                    <h3 className={styles.headerText}>Администрация</h3>
                </div>

                <div className={styles.flex_item}>
                    <h3 className={styles.headerText}>Бан-лист</h3>
                </div>
            </div>
        </>
    )
}
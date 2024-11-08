import { useNavigate } from 'react-router-dom'
import styles from './Header-styles.module.scss'

export function Header() {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.headerBlock}>
                <div className={styles.flex_item}>
                    <img src='/main-logo.png' className={styles.img_mainLogo} onClick={() => navigate('/')} />
                </div>
                
                <div className={styles.flex_item}>
                    <h3 className={styles.headerText} onClick={() => navigate('/admin')}>Администрация</h3>
                </div>

                <div className={styles.flex_item}>
                    <h3 className={styles.headerText} onClick={() => navigate('/banlist')}>Бан-лист</h3>
                </div>

                <div className={styles.flex_item}>
                    <h3 className={styles.headerText} onClick={() => navigate('/rules')}>Правила и FAQ</h3>
                </div>
            </div>
        </>
    )
}
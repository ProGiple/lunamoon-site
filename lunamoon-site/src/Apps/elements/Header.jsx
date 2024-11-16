import { useNavigate } from 'react-router-dom'
import styles from './Header-styles.module.scss'
import { useMemo } from 'react';

export function Header() {
    const navigate = useNavigate();

    const online = 100;
    const maxOnline = 500;

    const getBarOnline = useMemo(() => {
        var procent = (online / maxOnline) * 100;
        return (procent > 100 ? 100 : procent);
    }, [online, maxOnline])

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

                <div className={`${styles.online}`}>
                    <h3>Онлайн: {online} / {maxOnline}</h3>
                    <div className={styles.bar}>
                        <div className={styles.fill} style={{width: `${getBarOnline}%`}} />
                    </div>
                </div>
            </div>
        </>
    )
}
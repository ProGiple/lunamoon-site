import { useNavigate } from 'react-router-dom'
import styles from './App.module.scss'

export function ErrorPage() {
    const navigate = useNavigate()
    return (
        <div className={styles.main_block} onClick={() => navigate('/')}>
            <img src='/main-logo.png' width='5%' />
            <h3 className={styles.text}>Хэй, Видимо ты чуточку не туда попал!</h3>
            <h3 className={styles.text}>Ты попал на несуществующую страницу 404!</h3>
        </div>
    )
}
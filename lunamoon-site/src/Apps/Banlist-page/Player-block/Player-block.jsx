import styles from './Player-block.module.scss'

export function PlayerBlock({bannedNick, adminNick, reason}) {
    return (
        <div className={styles.block}>
            {bannedNick}
            {adminNick}
        </div>
    )
}

export function BanExampleBlock() {
    return (
        <div className={`${styles.block} ${styles.main_block}`}>
            Имя
        </div>
    )
}
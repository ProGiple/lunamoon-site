import { useMemo, useState } from 'react'
import styles from './App.module.scss'
import tableStyles from './table.module.scss'

const sliceAmount = -7
const sliceData = ({ varData=[], varPage }) => {
    if (varPage > 1) {
        return varData.slice(sliceAmount * varPage, sliceAmount * (varPage - 1))
    }
    return varData.slice(sliceAmount)
}

export function BanListPage() {
    const unSortedData = [
        { bannedNick: 'ProGiple', adminNick: 'Dakota_', reason: 'захотел', date: '09.11.2024', end: '08.10.2023', type: 'Мут' },
        { bannedNick: 'Dakota_', adminNick: 'JESTER', reason: 'нарушение правил', date: '10.11.2024', end: '10.12.2024', type: 'Бан' },
        { bannedNick: 'JESTER', adminNick: 'ProGiple', reason: 'спам в чате', date: '11.11.2025', end: '11.12.2024', type: 'Мут' },
        { bannedNick: 'strelka_', adminNick: 'Dakota_', reason: 'пример причины', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
        { bannedNick: 'strelka_', adminNick: 'Dakota_', reason: 'пример причины', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
        { bannedNick: 'strelka_', adminNick: 'NASTYA_', reason: 'пример причины', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
        { bannedNick: 'strelka_', adminNick: 'Dakota_', reason: 'пример причины', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
        { bannedNick: 'strelka_', adminNick: 'Dakota_', reason: 'пример причины', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
        { bannedNick: 'ProGiple', adminNick: 'Console', reason: '[А.Ч.] 1.1 - Игра с запрещённым ПО', date: '09.11.2024', end: '08.10.2023', type: 'Мут' },
    ];

    const data = useMemo(() => {
        return unSortedData.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    }, [unSortedData])

    const [page, setPage] = useState(1)
    const [searchPlayer, setSearchPlayer] = useState("")
    const [searchAdmin, setSearchAdmin] = useState("")

    const [tableHasOpacity, setTableHasOpacity] = useState(true)
    const [checkboxValues, setCheckboxValues] = useState({ mutes: false, warns: false, bans: false, kicks: false });
 
    const handleSearchPlayer = (event) => {
        if (page !== 1) handleSetPage(1)
        setSearchPlayer(event.target.value);
    }
    const handleSearchAdmin = (event) => {
        if (page !== 1) handleSetPage(1)
        setSearchAdmin(event.target.value);
    }

    const handleSetPage = (newPage) => {
        setTableHasOpacity(false)
        setTimeout(() => {
            setPage(newPage)
            setTimeout(() => {
                setTableHasOpacity(true)
            }, 15)
        }, 325)
    }
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (page !== 1) handleSetPage(1)
        setCheckboxValues(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const filteredData = useMemo(() => {
        return data.filter((item) => 
            (!searchPlayer || item.bannedNick.toLowerCase().startsWith(searchPlayer.toLowerCase())) && item.adminNick.toLowerCase().startsWith(searchAdmin.toLowerCase())
            && ((!checkboxValues.bans && !checkboxValues.mutes && !checkboxValues.warns && !checkboxValues.kicks) 
            || (checkboxValues.bans && item.type == 'Бан') || (checkboxValues.mutes && item.type == 'Мут')
            || (checkboxValues.warns && item.type == 'Варн') || (checkboxValues.kicks && item.type == 'Кик'))
        );
    }, [data, searchPlayer, checkboxValues])

    const getPages = Math.ceil(filteredData.length / -sliceAmount)

    return (
        <div className={styles.block}>
            <h2 className={`${styles.screenVisible} ${styles.text}`}>Разрешение экрана очень мало! Открой бан-лист в браузере с версии ПК или перейди на другое устройство!</h2>
            <h2 className={`${styles.text} ${styles.flex_item}`}>Список наказаний</h2>
                <div className={styles.flex_item}>
                    <div className={styles.text}>
                        <span className={styles.text}>Показать: </span>
                        <input type="checkbox" name="warns" checked={checkboxValues.warns} className={styles.checkBox} onChange={handleCheckboxChange} />
                        <label htmlFor="warns">Варны</label>

                        <input type="checkbox" name="mutes" checked={checkboxValues.mutes} className={styles.checkBox} onChange={handleCheckboxChange} />
                        <label htmlFor="mutes">Муты</label>

                        <input type="checkbox" name="bans" checked={checkboxValues.bans} className={styles.checkBox} onChange={handleCheckboxChange} />
                        <label htmlFor="bans">Баны</label>

                        <input type="checkbox" name="kicks" checked={checkboxValues.kicks} className={styles.checkBox} onChange={handleCheckboxChange} />
                        <label htmlFor="kicks">Кики</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Поиск по игрокам..."
                            value={searchPlayer}
                            onChange={handleSearchPlayer} />
                        <input
                            type="text"
                            placeholder="Поиск по сотрудникам..."
                            value={searchAdmin}
                            onChange={handleSearchAdmin} />
                        <img src='/mark1.png' onClick={() => {setSearchAdmin(""), setSearchPlayer(""), setCheckboxValues({ mutes:false, warns:false, bans:false, kicks:false })}} className={styles.mark} />
                    </div>
                </div>
                <h3 className={`${styles.text} ${styles.flex_item}`}>Страница: {page} / {getPages}</h3>

                {filteredData.length === 0 ? <h3 className={`${styles.text} ${styles.flex_item}`}>Ничего не найдено!</h3> : <>
                    <table className={`${styles.flex_item} ${tableStyles.table} ${tableStyles.extend} ${tableHasOpacity ? null : tableStyles.opacity}`}>
                        <tbody>
                            {sliceData({varData: filteredData, varPage: page}).map((item, index) => (
                                item && (
                                    <tr className={tableStyles.classic} key={index}>
                                        <th className={tableStyles.inline}><img src={`https://minotar.net/helm/${item.bannedNick}/250`} /> {item.bannedNick}</th>
                                        <th className={tableStyles.inline}><img src={`https://minotar.net/helm/${item.adminNick}/250`} /> {item.adminNick}</th>
                                        <th>{item.reason}</th>
                                        <th>{item.date}</th>
                                        <th>{item.end}</th>
                                        <th>{item.type}</th>
                                    </tr>
                                )
                            ))}
                        </tbody>
                        <thead>
                            <tr>
                                <>
                                    <th>Игрок</th>
                                    <th>Сотрудник</th>
                                    <th>Причина</th>
                                    <th>Дата</th>
                                    <th>Истечение</th>
                                    <th>Тип</th>
                                </>
                            </tr>
                        </thead>
                    </table>
                    <div className={`${styles.buttons} ${page === 1 || page === getPages || page === 2 || page === getPages - 1 ? (tableHasOpacity ? null : tableStyles.opacity) : null}`}>
                        {page === 1 ? null : <button onClick={() => handleSetPage(1)}>..1</button>}
                        {page > 1 ? <button onClick={() => handleSetPage(page - 1)}>« Назад</button> : null}
                        {getPages > page ? <button onClick={() => handleSetPage(page + 1)}>Вперёд »</button> : null}
                        {page === getPages ? null : <button onClick={() => handleSetPage(getPages)}>{getPages}..</button>}
                    </div></>
                }
        </div>
    )
}
import { useMemo, useState } from 'react'
import styles from './App.module.scss'
import tableStyles from './table.module.scss'

const sliceAmount = -25
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
        { bannedNick: 'strelka_', adminNick: 'Dakota_', reason: 'даунизм', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
        { bannedNick: 'strelka_', adminNick: 'Dakota_', reason: 'даунизм', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
        { bannedNick: 'strelka_', adminNick: 'Dakota_', reason: 'даунизм', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
        { bannedNick: 'strelka_', adminNick: 'Dakota_', reason: 'даунизм', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
        { bannedNick: 'strelka_', adminNick: 'Dakota_', reason: 'даунизм', date: '11.11.2024', end: '24.05.2026', type: 'Варн'},
    ];

    const data = useMemo(() => {
        return unSortedData.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    }, [unSortedData])

    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [tableHasOpacity, setTableHasOpacity] = useState(true)
    const [checkboxValues, setCheckboxValues] = useState({ mutes: false, warns: false, bans: false });
 
    const handleSearchEnter = (event) => {
        if (page !== 1) handleSetPage(1)
        setSearchTerm(event.target.value)
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
        setCheckboxValues(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const filteredData = useMemo(() => {
        return data.filter((item) => 
            (!searchTerm || item.bannedNick.toLowerCase().startsWith(searchTerm.toLowerCase()))
            && ((!checkboxValues.bans && !checkboxValues.mutes && !checkboxValues.warns) || (checkboxValues.bans && item.type == 'Бан') || (checkboxValues.mutes && item.type == 'Мут') || (checkboxValues.warns && item.type == 'Варн'))
        );
    }, [data, searchTerm, checkboxValues])

    const getPages = Math.ceil(filteredData.length / -sliceAmount)

    return (
        <div className={styles.block}>
            <h2 className={`${styles.text} ${styles.flex_item}`}>Список наказаний</h2>
                <div className={styles.flex_item}>
                    <div className={styles.checkBoxes}>
                        <span className={styles.text}>Показать:</span>
                        <input type="checkbox" name="warns" checked={checkboxValues.checkbox1} onChange={handleCheckboxChange} />
                        <label htmlFor="warns">Варны</label>

                        <input type="checkbox" name="mutes" checked={checkboxValues.checkbox2} onChange={handleCheckboxChange} />
                        <label htmlFor="mutes">Муты</label>

                        <input type="checkbox" name="bans" checked={checkboxValues.checkbox2} onChange={handleCheckboxChange} />
                        <label htmlFor="bans">Баны</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Поиск по игрокам..."
                        value={searchTerm}
                        onChange={handleSearchEnter} />
                </div>
                <h3 className={`${styles.text} ${styles.flex_item}`}>Страница: {page} / {getPages}</h3>

                {filteredData.length === 0 ? 'Ничего не найдено!' : <>
                    <table className={`${styles.flex_item} ${tableHasOpacity ? null : tableStyles.opacity}`}>
                        <tbody>
                            {sliceData({varData: filteredData, varPage: page}).map((item) => (
                                item && (
                                    <tr className={tableStyles.classic}>
                                        <th>{item.bannedNick}</th>
                                        <th>{item.adminNick}</th>
                                        <th className={tableStyles.reason}>{item.reason}</th>
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
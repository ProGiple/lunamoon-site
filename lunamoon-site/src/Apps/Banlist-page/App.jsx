import { useState } from 'react'
import styles from './App.module.scss'
import { BannedPlayerCell } from './element'

const sliceAmount = -25
const sliceData = ({ varData=[], varPage }) => {
    if (varPage > 1) {
        return varData.slice(sliceAmount * varPage, sliceAmount * (varPage - 1))
    }
    return varData.slice(sliceAmount)
}

export function BanListPage() {
    const data = [
        { bannedNick: 'ProGiple', adminNick: 'Dakota_', reason: 'захотел', date: '09.11.2024', end: '08.10.2023', type: 'Мут' },
        { bannedNick: 'Dakota_', adminNick: 'JESTER', reason: 'нарушение правил', date: '10.11.2024', end: '10.12.2024', type: 'Бан' },
        { bannedNick: 'JESTER', adminNick: 'ProGiple', reason: 'спам в чате', date: '11.11.2024', end: '11.12.2024', type: 'Мут' },
    ];

    const [page, setPage] = useState(1)
    const [filterType, setFilterType] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
  
    const handleFilterChange = (event) => {
        setFilterType(event.target.value)
    }  
    const handleSearchEnter = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredData = data.filter((item) => {
        const searchRegex = new RegExp(searchTerm, 'i');
        return (!searchTerm || searchRegex.test(item.bannedNick) || searchRegex.test(item.adminNick)) &&
               (!filterType || item.type === filterType);
    })

    const getPages = Math.ceil(filteredData.length / -sliceAmount)

    return (
        <div className={styles.block}>
            <h3 className={`${styles.text} ${styles.flex_item}`}>Список наказаний</h3>
                <div className={styles.flex_item}>
                    <select value={filterType} onChange={handleFilterChange} className={styles.select_block}>
                        <option value="">Все типы</option>
                        <option value="Мут">Мут</option>
                        <option value="Бан">Бан</option>
                        <option value="Варн">Варн</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Поиск по игрокам..."
                        value={searchTerm}
                        onChange={handleSearchEnter} />
                </div>
                <h3>Страниц: {getPages}</h3>
                <table className={styles.flex_item}>
                    <thead>
                        <tr>
                            {filteredData.length !== 0 ?
                                <>
                                    <th>Игрок</th>
                                    <th>Сотрудник</th>
                                    <th>Причина</th>
                                    <th>Дата</th>
                                    <th>Истечение</th>
                                    <th>Тип</th>
                                </> : <th>Ничего не найдено!</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {sliceData({varData: filteredData, varPage: page}).map((item, index) => (
                            item && (
                                <BannedPlayerCell
                                    key={index}
                                    bannedNick={item.bannedNick}
                                    adminNick={item.adminNick}
                                    reason={item.reason}
                                    date={item.date}
                                    end={item.end}
                                    type={item.type} />
                            )
                        ))}
                    </tbody>
                </table>
                <div className={styles.buttons}>
                    {page !== 1 ? <button onClick={() => setPage(1)}>..1</button> : null}
                    {page > 1 ? <button onClick={() => setPage(page - 1)}>«</button> : null}
                    {getPages > page + 1 ? <button onClick={() => setPage(page + 1)}>»</button> : null}
                </div>
        </div>
    )
}
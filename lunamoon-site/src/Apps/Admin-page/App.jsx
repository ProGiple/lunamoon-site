import { useMemo, useState } from 'react';
import styles from './App.module.scss';
import tableStyles from './table.module.scss';

export function AdminPage() {
    const unFilteredAdminList = [
        { nick: 'ProGiple', permission: 15, url: 'https://vk.com/giple', reports: 999, fullActive: 900 },
        { nick: 'Dakota', permission: 25, url: 'https://t.me/novasparkle', reports: 999, fullActive: 556 }
    ]

    const permissionIcons = [
        { level: 15, image: 'luna.png' },
        { level: 25, image: 'luna.png' }
    ]

    const [searchNick, setSearchNick] = useState("");
    const handleSearch = (event) => {
        setSearchNick(event.target.value);
    }

    const filteredAdminList = useMemo(() => {
        return unFilteredAdminList.sort((a, b) => b.permission - a.permission).filter(
            (admin) => (searchNick === '' || admin.nick.toLowerCase().startsWith(searchNick.toLowerCase())));
    }, [unFilteredAdminList, searchNick])

    const getIcon = ({ level = 0 }) => {
        const foundPerm = permissionIcons.find((perm) => perm.level === level);
    
        if (foundPerm) {
            return foundPerm.image;
        }
    
        return 'none.png';
    }

    return (
        <>  
            <div className={styles.mainBlock}>
                <input type='text' placeholder='Поиск по нику' onChange={handleSearch} />
                {filteredAdminList.length === 0 ? <h3 className={styles.text}>Ничего не найдено!</h3> : <>
                    <table className={tableStyles.table}>
                        <tbody>
                            {filteredAdminList.map((admin, index) => admin && (<tr key={index} onClick={() => {window.location.href = admin.url}} className={tableStyles.classic}>
                                <th className={tableStyles.inline}><img src={`https://minotar.net/helm/${admin.nick}/250`} /> {admin.nick}</th>
                                <th><img src={`/${getIcon(admin.permission)}`} /></th>
                                <th>{admin.reports} шт.</th>
                                <th>{admin.fullActive} мин.</th>
                            </tr>))}
                        </tbody>
                        <thead>
                            <tr>
                                <th>Никнейм</th>
                                <th>Должность</th>
                                <th>Отчётов</th>
                                <th>Наиграно</th>
                            </tr>
                        </thead>
                    </table>
                </>}
            </div>
        </>
    )
}
import { useMemo, useState } from 'react';
import styles from './App.module.scss';

export function AdminPage() {
    const allPermissions = [
        { level: 25, name: 'Владелец', color: '#ff3bce' },
        { level: 15, name: 'Тех. админ', color: '#ff3bce' },
        { level: 35, name: 'Пидор', color: '#ff3bce' }
    ]

    const permTypes = [] = useMemo(() => {
        return (allPermissions.length === 0 ? ['NoData'] : allPermissions.reduce((types, perm) => {
            if (!types.includes(perm.name)) {
                return [...types, perm.name];
            }
            return types;
        }, []))
    }, [allPermissions])

    const unFilteredAdminList = [
        { nick: 'ProGiple', permission: 'Тех. админ', url: 'https://vk.com/giple', urlName: 'Страничка ВК', reports: 999, date: '24/09/2024' },
        { nick: 'Dakota_', permission: 'Владелец', url: 'https://t.me/novasparkle', urlName: 'Страничка ВК', reports: 999, date: '24/10/2023' },
        { nick: 'JESTER', permission: 'Владелец', url: 'https://t.me/jester', urlName: 'Страничка ВК', reports: 999, date: '24/10/2023' },
        { nick: 'runercx', permission: 'Тех. админ', url: 'https://t.me/runercx', urlName: 'Страничка ВК', reports: 999, date: '24/10/2023' },
        { nick: 'Dakota_', permission: 'Владелец', url: 'https://t.me/novasparkle', urlName: 'Страничка ВК', reports: 999, date: '24/10/2023' },
        { nick: 'Dakota_', permission: 'Владелец', url: 'https://t.me/novasparkle', urlName: 'Страничка ВК', reports: 999, date: '24/10/2023' },
        { nick: 'strelka_', permission: 'Пидор', url: 'https://t.me/pidoras', urlName: 'Телега', reports: 1, date: '24/10/2025' }
    ]

    const [searchNick, setSearchNick] = useState("");
    const handleSearch = (event) => {
        open(0);
        setSearchNick(event.target.value);
    }

    const [searchPermission, setSearchPermission] = useState("");
    const handleSearchPerm = (event) => {
        open(0);
        setSearchPermission(event.target.value);
    }

    const getPermWeight = ({ node }) => {
        return allPermissions.find((perm) => perm.name === node).level;
    }

    const getColor = ({ node }) => {
        const foundPerm = allPermissions.find((perm) => perm.level === getPermWeight({ node: node }));
    
        if (foundPerm) {
            return foundPerm.color;
        }
    
        return '#ff3bce';
    }

    const [openedModal, setOpenedModal] = useState(0);
    const open = ({ index = 0 }) => {
        if (openedModal !== index) {
            setOpenedModal(index);
        }
    }

    const filteredAdminList = useMemo(() => {
        return unFilteredAdminList.sort((a, b) => getPermWeight({ node: b.permission }) - getPermWeight({ node: a.permission })).filter(
            (admin) => (searchNick === '' || admin.nick.toLowerCase().startsWith(searchNick.toLowerCase())) && (searchPermission === '' || admin.permission === searchPermission));
    }, [unFilteredAdminList, searchNick, allPermissions, openedModal])

    const handleRedirect = () => {
        window.open(filteredAdminList[openedModal].url, '_blank');
    };

    return (
        <>  
            <div className={`${styles.mainBlock}`}>
                <div className={styles.filter}>
                    <input type='text' placeholder='Поиск по нику' onChange={handleSearch} />
                    <select className={styles.select} onChange={handleSearchPerm}>
                        <option value="">Все роли</option>
                        {permTypes.map((perm, index) => {
                            return <option value={perm} key={index}>{perm}</option>
                        })}
                    </select>
                </div>
                {filteredAdminList.length === 0 || filteredAdminList === null ? <h3 className={styles.text}>Ничего не найдено!</h3> : <>
                    <div className={styles.adminBlock}>
                        <div className={`${styles.modal} ${styles.adminCard}`}>
                        {openedModal !== null && openedModal < filteredAdminList.length && (
                                <>
                                    <img src={`https://minotar.net/helm/${filteredAdminList[openedModal].nick}/50`} className={styles.image} />
                                    <div className={`${styles.nickname} ${styles.text}`}>
                                        {filteredAdminList[openedModal].nick}
                                    </div>
                                    <div className={`${styles.text} ${styles.infoBox}`}>
                                        <div className={styles.item}>
                                            Дата назначения: <span styles={styles.underline}>
                                                {filteredAdminList[openedModal].date}
                                            </span>
                                        </div>
                                        <div className={styles.item}>
                                            Кол-во отчётов: <span styles={styles.underline}>
                                                {filteredAdminList[openedModal].reports}
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={handleRedirect}>
                                        {filteredAdminList[openedModal].urlName}
                                    </button>
                                    <div className={`${styles.permission} ${styles.modalCase}`} style={{backgroundColor: getColor({ node: filteredAdminList[openedModal].permission }), 
                                                                            boxShadow: '0 0 10px ' + getColor({ node: filteredAdminList[openedModal].permission }), 
                                                                            boxShadow: '0 0 20px ' + getColor({ node: filteredAdminList[openedModal].permission })}}>
                                                                                {filteredAdminList[openedModal].permission}
                                    </div>
                                </>
                            )}
                            
                        </div>
                        {filteredAdminList.map((admin, index) => {
                            const color = getColor({ node: admin.permission });

                            return <div className={`${styles.adminCard} ${styles.default}`} key={index} onClick={() => open({ index: index })}>
                                <img src={`https://minotar.net/helm/${admin.nick}/50`} className={styles.image} />
                                <div className={`${styles.nickname} ${styles.text}`}>{admin.nick}</div>
                                <div className={styles.permission} style={{backgroundColor: color, 
                                                                            boxShadow: '0 0 10px ' + color, boxShadow: '0 0 20px ' + color}}>{admin.permission}</div>
                            </div>
                        })}
                    </div>
                </>}
            </div>
        </>
    )
}
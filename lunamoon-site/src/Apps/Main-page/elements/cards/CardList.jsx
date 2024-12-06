import { useMemo, useState } from 'react';
import styles from './Cards.module.scss';
import { Card } from './Card';
export function CardList() {
    const cards = [
        { type: 'Привилегии', name: 'Странник', lore: 'Возможности: \n -> Нету их \n -> НИИИИИХУУУУУУЯЯЯЯЯЯЯ \n void \n Команды: \n -> /craft - открыть верстак', cost1: 39, cost2: 79, cost3: 90, image: "strannik" },
        { type: 'Предметы', name: 'Спавнер', lore: 'Хэллоу!', cost1: 79, cost2: 79, cost3: 79, image: "/img1.png" },
        { type: 'Привилегии', name: 'Луна', lore: 'Хэллоу!', cost1: 1299, cost2: 3909, cost3: 8888, image: "luna" },
        { type: 'Плюшки', name: 'Свой титул', lore: 'Хэллоу!', cost1: 249, cost2: 249, cost3: 249, image: "/img1.png" },
        { type: 'Плюшки', name: 'Свой титул', lore: 'Хэллоу!', cost1: 249, cost2: 249, cost3: 249, image: "/img1.png" },
        { type: 'Плюшки', name: 'Свой титул', lore: 'Хэллоу!', cost1: 249, cost2: 249, cost3: 249, image: "/img1.png" },
        { type: 'Плюшки', name: 'Свой титул', lore: 'Хэллоу!', cost1: 249, cost2: 249, cost3: 249, image: "/img1.png" },
        { type: 'Плюшки', name: 'Свой титул', lore: 'Хэллоу!', cost1: 249, cost2: 249, cost3: 249, image: "/img1.png" },
        { type: 'Привилегии', name: 'Луна', lore: 'Хэллоу!', cost1: 1299, cost2: 3909, cost3: 8888, image: "luna" },
        { type: 'Привилегии', name: 'Луна', lore: 'Хэллоу!', cost1: 1299, cost2: 3909, cost3: 8888, image: "luna" },
        { type: 'Привилегии', name: 'Луна', lore: 'Хэллоу!', cost1: 1299, cost2: 3909, cost3: 8888, image: "luna" },
        { type: 'Привилегии', name: 'Луна', lore: 'Хэллоу!', cost1: 1299, cost2: 3909, cost3: 8888, image: "luna" },
    ]
    const cardsTypes = [] = useMemo(() => {
        return (cards.length === 0 ? ['NoData'] : cards.reduce((types, card) => {
            if (!types.includes(card.type)) {
                return [...types, card.type];
            }
            return types;
        }, []))
    }, [cards])

    const [listType, setListType] = useState(cardsTypes[0]);
    const [hideProducts, setHideProducts] = useState(false);

    const handleEditCategory = (newType) => {
        if (listType !== newType) {
            setHideProducts(true);

        setTimeout(() => {
            setHideProducts(false);
            setListType(newType);
        }, 150)
        }
    }

    return (
        <>
            <div className={`${styles.block}`}>
                <div className={styles.typesBlock}>
                    <div className={styles.typeBlock}>
                        {cardsTypes.map((type, index) => {
                            return (
                                <div className={`${styles.typeText} ${type === listType ? styles.selectedType : styles.unSelectedType}`} 
                                    onClick={() => {handleEditCategory(type)}} key={index}>{type}</div>
                            ); 
                        })}
                    </div>
                </div>
                <div className={`${styles.productBlock} ${hideProducts ? styles.blur : null}`}>
                    {cards.map((card, index) => {
                        if (card.type === listType) {
                            return <Card sellItem={card} key={index} />
                        }
                        return null;
                    })}
                </div>
            </div>
        </>
    )
}
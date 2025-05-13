import { useMemo, useState } from 'react';
import styles from './Card.module.scss';
import modalStyles from './Modal.module.scss';

const promocodes = [
    { tag: "OPEN30!", sale: 30, allUses: 912, maxUses: 915 }, /* sale: 30 = 30% скидка */
    { tag: "PROGIPLE110", sale: 110, allUses: 912, maxUses: -1 },
    { tag: "DAKOTA has", sale: -20, allUses: 912, maxUses: -1 },
    { tag: "Siozy", sale: 90, allUses: 912, maxUses: -1 },
]

export function Card({ sellItem=[{type, name, lore, cost1, cost2, cost3, image}] }) {
    const costs = useMemo(() => {
        return [sellItem.cost1, sellItem.cost2, sellItem.cost3];
    }, [sellItem.cost1, sellItem.cost2, sellItem.cost3])
    const lores = [] = useMemo(() => {
        return sellItem.lore.split('\n');
    }, [sellItem.lore])

    const [modalIsOpen, setOpenModal] = useState(false);
    const toggleModal = () => {
        setOpenModal(!modalIsOpen);
        document.body.style.overflow = modalIsOpen ? 'auto' : 'hidden';
    }

    const Modal = () => {
        const [visibleContent, setVisibleContent] = useState(false);
        const [visibleModal, setVisibleModal] = useState(false);
        const [selectedNum, setSelectedNum] = useState(0);
        
        const [nickName, setNickName] = useState("");
        const [promo, setPromo] = useState("");

        const handleSendNick = (event) => {
            setNickName(event.target.value);
        }
        const handleSendPromo = (event) => {
            setPromo(event.target.value);
        }
        
        const cost = useMemo(() => {
            var localCost = costs[selectedNum];
            promocodes.map((promocode) => {
                if ((promocode.maxUses == -1 || promocode.allUses < promocode.maxUses) && promocode.tag === promo) {
                    localCost = costs[selectedNum] * (1 - (promocode.sale / 100));
                }
            })
            if (localCost <= 1) localCost = 66666;
            return Math.round(localCost);
        }, [promocodes, promo, selectedNum])

        return modalIsOpen ? (
            setTimeout(() => {
                setVisibleModal(true);

                setTimeout(() => {
                    setVisibleContent(true);
                }, 300)
            }, 150),

            <div className={`${modalStyles.background} ${visibleModal ? null : modalStyles.background_disActive}`} onClick={() => toggleModal()}>
                <div className={`${modalStyles.modal} ${modalStyles.second} ${visibleContent ? null : modalStyles.modal_disActive}`} onClick={(e) => e.stopPropagation()}>
                    <h3 className={modalStyles.header}>Описание:</h3>
                    <div className={styles.lore}>
                        {lores.map((line, index) => {
                        return <span className={styles.loreLine} key={index}>{line == 'void' || line == ' void' || line == 'void ' || line == ' void ' ? 'ㅤ' : line}</span>;
                    })}
                    </div>
                </div>
                <div className={`${modalStyles.modal} ${modalStyles.main} ${visibleContent ? null : modalStyles.modal_disActive}`}
                     onClick={(e) => e.stopPropagation()}>
                        <h3 className={modalStyles.header}>
                            Товар "{sellItem.name}"
                        </h3>

                        <div className={modalStyles.costBox}>
                            {sellItem.type !== 'Привилегии' ? 
                                <button className={`${modalStyles.costButton} ${modalStyles.true}`}> 1x » {costs[0]}₽</button> : costs.map((cost, index) => {
                                    return <button key={index} className={`${modalStyles.costButton} ${selectedNum === index ? modalStyles.true : modalStyles.false}`} onClick={() => {setSelectedNum(index)}}>
                                        {["30 дней", "90 дней", "Навсегда"][index]} » {cost}₽
                                    </button>
                                })
                            }
                        </div>
                        <input type='text' placeholder='Ваш ник в игре' onChange={handleSendNick} />
                        <input type='text' placeholder='Промокод (если есть)' onChange={handleSendPromo} />
                        <button className={`${modalStyles.buyButton} ${(nickName.length >= 4) ? modalStyles.true : modalStyles.false}`}>Оплатить {Math.round(cost)}₽</button>
                </div>
            </div>
          ) : null;
    }

    return (
        <>
            <Modal />
            <div className={`${styles.card} ${modalIsOpen ? null : styles.card_prop}`} onClick={() => {toggleModal()}}>
                <img src={`/${sellItem.image}.png`} />
                <h3>{sellItem.name}</h3>
                <div className={styles.button}>
                    Купить: от <span className={styles.enter}>{sellItem.cost1}₽</span>
                </div>
            </div>
        </>
    )
}
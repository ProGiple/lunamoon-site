import { useState } from 'react';
import styles from './Card.module.scss';
import modalStyles from './Modal.module.scss';

export function Card({ sellItem=[{type, name, lore, cost1, cost2, cost3, image}] }) {
    const costs = [sellItem.cost1, sellItem.cost2, sellItem.cost3];
    const [modalIsOpen, setOpenModal] = useState(false);
    const toggleModal = () => {
        setOpenModal(!modalIsOpen);
        document.body.style.overflow = modalIsOpen ? 'auto' : 'hidden';
    }

    const Modal = () => {
        const [visibleContent, setVisibleContent] = useState(false);
        const [visibleModal, setVisibleModal] = useState(false);

        return modalIsOpen ? (
            setTimeout(() => {
                setVisibleModal(true);

                setTimeout(() => {
                    setVisibleContent(true);
                }, 300)
            }, 150),

            <div className={`${modalStyles.background} ${visibleModal ? null : modalStyles.background_disActive}`} onClick={() => toggleModal()}>
                <div className={`${modalStyles.modal} ${visibleContent ? null : modalStyles.modal_disActive}`}
                     onClick={(e) => e.stopPropagation()}>
                        <h3 className={modalStyles.header}>
                            Товар "{sellItem.name}"
                        </h3>

                        <div className={modalStyles.costBox}>
                            {sellItem.type !== 'Привилегии' ? 
                                <div className={modalStyles.costButton}> 

                                </div> : costs.map((cost, index) => {
                                    return <button key={index} className={modalStyles.costButton}>
                                        {cost}₽
                                    </button>
                                })
                            }
                        </div>
                </div>
            </div>
          ) : null;
    }

    return (
        <>
            <Modal />
            <div className={styles.card} onClick={() => {toggleModal()}}>
                <img src={`/${sellItem.image}.png`} />
                <h3>{sellItem.name}</h3>
                <div className={styles.button}>
                    Купить: от <span className={styles.enter}>{sellItem.cost1}₽</span>
                </div>
            </div>
        </>
    )
}
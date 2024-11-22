import { useState } from "react";
import bannerStyles from "./banner.module.scss";

export function Banner() {
    const [buttonText, setButtonText] = useState("mc.lunamoon.space");

    const handleCopy = () => {
        let text = "Скопировано!";
        if (buttonText !== text) {
            var ip = buttonText;
            navigator.clipboard.writeText(ip);
            setButtonText(text)

            setTimeout(() => {
                setButtonText(ip);
            }, 2000)
        }
    }

    return (
        <>  
            <div className={bannerStyles.infoBox}>
                <img src="/skin3.png" className={bannerStyles.player} />
                <div className={bannerStyles.clickable}>
                    <div className={bannerStyles.text}>
                        <h2 className={bannerStyles.header}>Понравился наш сумеречный проект?</h2>
                        <h3>Донат — Основной источник заработка с сервера и именно он позволяет обеспечивать сервер всеми необходимыми потребностями и обновлениями!</h3>
                    </div>
                    <div className={bannerStyles.buttons}>
                        <button onClick={() => {handleCopy()}}>
                            {buttonText}
                            <img src="/mark2.png" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

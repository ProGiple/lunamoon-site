import { useState } from "react";
import bannerStyles from "./banner.module.scss";

export function Banner() {
    const [buttonText, setButtonText] = useState("mc.satespace.tech");

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
                        <h3>Поддержи сервер своей денюжкой в магазине ниже:</h3>
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

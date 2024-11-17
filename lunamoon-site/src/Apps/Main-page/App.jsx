import styles from "./App.module.scss";
import { Banner } from "./elements/Banner";
import { CardList } from "./elements/cards/CardList";

export function MainPage() {
    return (
      <>
          <Banner />
          <CardList />
      </>
    )
}

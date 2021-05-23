import type { ConstellationCard } from "../src/card-data";

import CardFace from './CardFace'

import styles from '../styles/CardPage.module.css'

export default function Card({card}: {card: ConstellationCard}) {
  return (
    <div className={styles.card}>
        <CardFace face={card.front} />
        <CardFace face={card.back} />
    </div>
  );
}
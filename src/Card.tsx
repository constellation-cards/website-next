import type { ConstellationCard } from "../src/card-data";

import CardFace from './CardFace'

const styles = require('../styles/CardPage.module.css')

export default function Card({card}: {card: ConstellationCard}) {
  return (
    <div className={styles.card}>
        <CardFace card={card} face={card.front} />
        <CardFace card={card} face={card.back} />
    </div>
  );
}
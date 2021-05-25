import { join, map } from "ramda";
import type { ConstellationCard, ConstellationCardFace } from "../src/card-data";

const styles = require('../styles/CardPage.module.css')

const tagLink = (tag: string) => <li key={tag}><a href={`/tags/${tag}`}>{tag}</a></li>

export default function Card({card, face}: {card: ConstellationCard, face: ConstellationCardFace}) {
  return (
    <div className={styles.face}>
        <h3><a href={`/cards/${card.slug}`}>{face.name}</a></h3>
        <p>
          <small>
            {map(tagLink, face.tags)}
          </small>
        </p>
        <p>{face.desc}</p>
        <ul>
            {map(prompt => <li>{prompt}</li>, face.prompts)}
        </ul>
        <em>{face.rule}</em>
    </div>
  );
}
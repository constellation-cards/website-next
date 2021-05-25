import { map } from "ramda";
import type { ConstellationCardFace } from "../src/card-data";

const styles = require('../styles/CardPage.module.css')

export default function Card({face}: {face: ConstellationCardFace}) {
  return (
    <div className={styles.face}>
        <h3>{face.name}</h3>
        <p>{face.desc}</p>
        <ul>
            {face.prompts.map(prompt => <li>{prompt}</li>)}
        </ul>
        <em>{face.rule}</em>
    </div>
  );
}
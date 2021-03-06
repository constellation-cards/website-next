import Head from "next/head";
import { concat, groupBy, join, uniq } from "ramda";

import { GetStaticProps } from "next";
import { ConstellationCard } from "../src/card-data";

const styles = require("../styles/Home.module.css");

export default function Home({
  groupedCards
}: {
  groupedCards: Record<string, ConstellationCard[]>;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Constellation Cards</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {Object.keys(groupedCards).map(key => 
          <>
            <h3>{key}</h3>
            <ul>
              {groupedCards[key].map(card => <li key={card.slug}><a href={`/cards/${card.slug}`}>{card.name}</a></li>)}
            </ul>
          </>
        )}
      </main>

      <footer className={styles.footer}>Powered by DigitalOcean Apps</footer>
    </div>
  );
}

const cardTagsToString = (card: ConstellationCard) => join(' / ', uniq(
  concat(card.front.tags, card.back.tags)
))

export const getStaticProps: GetStaticProps = async (context) => {
  const cards = await import("../src/card-data");
  const groupedCards = groupBy(
    cardTagsToString, cards.cards
  )

  return {
    props: {
      groupedCards
    }
  };
};

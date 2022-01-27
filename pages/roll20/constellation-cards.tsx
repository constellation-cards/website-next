import { GetStaticProps } from "next";
//import Script from "react-inline-script";

import { ConstellationCard } from "../../src/card-data";

//import Pictos from './pictos'
import Card from './card';
import RepeatingAttribute from "./repeating-attribute";

export default function Roll20Page({ cards }: { cards: ConstellationCard[] }) {
  return (
    <>
      <div className={"character-sheet"}>
        <div className={"card-list"}>
          <RepeatingAttribute name={"cards"}>
            <Card />
          </RepeatingAttribute>
        </div>
      </div>
    </>
  );
}

Roll20Page.getLayout = (page: any) => <>{page}</>;

export const getStaticProps: GetStaticProps = async (context) => {
  const cards = await import("../../src/card-data");
  return {
    props: {
      cards: cards.cards
    }
  };
};

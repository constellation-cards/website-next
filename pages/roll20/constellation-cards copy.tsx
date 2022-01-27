import { GetStaticProps } from "next";
import { ConstellationCard } from "../../src/card-data";

import RollButton from "./roll-button";
import Pictos from './pictos'

// import Card from '../../src/Card'

// {cards.map(card => <Card card={card} />)}

export default function Page({ cards }: { cards: ConstellationCard[] }) {
  return (
    <>
      <div className="charsheet">
        <div className="1colrow">
          <RollButton value="!deal @{character_id} ?{card_name|Hurt}" label={"Add Card"}/>
          <RollButton value="!dealone @{character_id} ?{card_category|condition}" label={"By Category"}/>
          <RollButton value="!dealcharacter @{character_id}" label={"Build Character"}/>
          <RollButton value="!dealencounter @{character_id}" label={"Build Encounter"}/>
        </div>
        <fieldset className="repeating_cards">
          <div className="2colrow">
            <input
              type="checkbox"
              name="attr_card_flipped"
              className="sheet-card-flipped"
            />
            <div className="col sheet-card-front">
              <div className="flipacard-card">
                <div className="flipacard-card-border">
                  <input
                    type="checkbox"
                    name="attr_card_edit"
                    className="sheet-card-edit"
                  />
                  <div className="flipacard-show">
                    <h4 className="flipacard-card-header">
                      <button
                        type="action"
                        name="act_flip"
                        className="flip-button"
                      >
                        <Pictos char='reload' />
                      </button>
                      <button type="action" name="act_edit">
                        <Pictos char='settings' />
                      </button>
                      <button
                        type="roll"
                        className="blank-roll-button"
                        name="quote_front"
                        value="&{template:cardface} {{name=@{front_name}}} {{side=Front}} {{desc=@{front_desc}}}"
                      >
                        <Pictos char='explain' />
                      </button>
                      &nbsp;
                      <span name="attr_front_name"></span>
                    </h4>
                    <p className="prelike">
                      <span name="attr_front_desc"></span>
                    </p>
                  </div>
                  <div className="flipacard-edit">
                    <input
                      type="text"
                      className="flipacard-text-input"
                      name="attr_front_name"
                      placeholder="Card Name (front)"
                    />
                    <textarea
                      className="flipacard-text-input"
                      name="attr_front_desc"
                    ></textarea>
                    <button type="action" name="act_edit">
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col sheet-card-back">
              <div className="flipacard-card">
                <div className="flipacard-card-border">
                  <input
                    type="checkbox"
                    name="attr_card_edit"
                    className="sheet-card-edit"
                  />
                  <div className="flipacard-show">
                    <h4 className="flipacard-card-header">
                      <button
                        type="action"
                        name="act_flip"
                        className="flip-button"
                      >
                        <Pictos char='reload' />
                      </button>
                      <button type="action" name="act_edit">
                        <Pictos char='settings' />
                      </button>
                      <button
                        type="roll"
                        className="blank-roll-button"
                        name="quote_back"
                        value="&{template:cardface} {{name=@{back_name}}} {{side=Back}} {{desc=@{back_desc}}}"
                      >
                        <Pictos char='explain' />
                      </button>
                      &nbsp;
                      <span name="attr_back_name"></span>
                    </h4>
                    <p className="prelike">
                      <span name="attr_back_desc"></span>
                    </p>
                  </div>
                  <div className="flipacard-edit">
                    <input
                      type="text"
                      className="flipacard-text-input"
                      name="attr_back_name"
                      placeholder="Card Name (back)"
                    />
                    <textarea
                      className="flipacard-text-input"
                      name="attr_back_desc"
                    ></textarea>
                    <button type="action" name="act_edit">
                      Done
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}

// TODO: include roll templates and script workers
Page.getLayout = (page: any) => <>{page}</>;

export const getStaticProps: GetStaticProps = async (context) => {
  const cards = await import("../../src/card-data");
  return {
    props: {
      cards: cards.cards
    }
  };
};

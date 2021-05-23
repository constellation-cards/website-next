import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml'

import {
  concat,
  filter,
  has,
  includes,
  isEmpty,
  map,
  mergeDeepRight,
  partition,
  pathOr,
  reduce,
  uniq,
  unnest
} from "ramda";

import slug from "slug";

export interface ConstellationCardFace {
  name: string;
  tags: string[];
  desc: string;
  prompts: string[];
  rule: string;
}

export interface ConstellationCard {
  front: ConstellationCardFace;
  back: ConstellationCardFace;
  name: string;
  slug: string;
  qty: number;
}

const defaultCardFace: ConstellationCardFace = {
  name: "",
  tags: [],
  desc: "",
  prompts: [],
  rule: ""
};

const defaultCard: ConstellationCard = {
  front: defaultCardFace,
  back: defaultCardFace,
  name: "",
  slug: "",
  qty: 1
};

const tagIconMapping: Record<string, string> = {
  front: "arrow-up-circle.png",
  back: "arrow-down-circle.png",
  character: "star.png",
  origin: "home.png",
  focus: "key.png",
  role: "user.png",
  condition: "heart.png",
  encounter: "alert-circle.png",
  modifier: "plus-circle.png",
  oracle: "help-circle.png",
  success: "shuffle.png"
  // "demo": "",
};

function iconForTag(tag: string): string {
  return tagIconMapping[tag];
}

/**
 * Look for YAML files holding card data under a given directory.
 * Return a list of full paths to those files.
 * @param {*} dir
 */
function getCardPaths(dir: string): string[] {
  const result = map((f) => path.join(dir, f), fs.readdirSync(dir));
  let [dirs, files] = partition(
    (path) => fs.statSync(path).isDirectory(),
    result
  );
  files = reduce(
    (efiles, dir) => concat(efiles, getCardPaths(dir)),
    files,
    dirs
  );
  return files;
}

/**
 * Look for card data under a given directory.
 * Return an array of cards
 * @param {*} dir
 */
function getCardData(dir: string): object[] {
  const filepaths = getCardPaths(dir);
  const filecontent = map(
    (filepath) => fs.readFileSync(filepath, "utf8").toString(),
    filepaths
  );
  const rows = unnest(map((content) => yaml.load(content), filecontent));
  const carddata = filter(has("front"), rows);
  return carddata as ConstellationCard[];
}

function refineCard(card: object): ConstellationCard {
  const newCard = mergeDeepRight(defaultCard, card);
  if (isEmpty(newCard.name)) {
    newCard.name =
      newCard.front.name === newCard.back.name
        ? newCard.front.name
        : `${newCard.front.name} / ${newCard.back.name}`;
  }
  newCard.slug = slug(newCard.name);
  return newCard;
}

function refineCards(cardData: object[]) {
  return map(refineCard, cardData);
}

function allCardsWithTag(tag: string, cards: ConstellationCard[]) {
  return filter(
    (card) =>
      includes(tag, pathOr([], ["front", "tags"], card)) ||
      includes(tag, pathOr([], ["back", "tags"], card)),
    cards
  );
}

function allTags(cards: ConstellationCard[]) {
  const getTags = (side: string) =>
    unnest(map((card) => pathOr([], [side, "tags"], card), cards));
  return uniq(concat(getTags("front"), getTags("back")));
}

const rawCardData = getCardData(path.resolve(process.cwd(), "card-data"));
export const cards = refineCards(rawCardData);

module.exports = {
  cards,
  allCardsWithTag,
  allTags,
  iconForTag
};

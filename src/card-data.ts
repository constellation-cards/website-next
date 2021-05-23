const fs = require("fs"),
  path = require("path"),
  yaml = require("js-yaml");

import { concat, filter, has, map, partition, reduce, unnest } from "ramda";

export interface ConstellationCardFace {
  name?: string;
  tags?: string[];
  desc?: string;
  prompts?: string[];
  rule?: string;
}

export interface ConstellationCard {
  front: ConstellationCardFace;
  back: ConstellationCardFace;
  qty?: number;
}

const tagIconMapping: Record<string,string> = {
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
function getCardData(dir: string): ConstellationCard[] {
  const filepaths = getCardPaths(dir);
  const filecontent = map(
    (filepath) => fs.readFileSync(filepath, "utf8").toString(),
    filepaths
  );
  const rows = unnest(map((content) => yaml.load(content), filecontent));
  const carddata = filter(has("front"), rows);
  return carddata as ConstellationCard[];
}

export const cardData = getCardData(path.resolve(process.cwd(), 'card-data'))

module.exports = {
  cardData,
  getCardData,
  iconForTag
};
